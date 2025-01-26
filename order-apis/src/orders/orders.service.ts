import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ApiService } from '../api/api.service';
import { Product } from '../entity';
import { OrderProduct } from '../entity/order-product.entity';
import { Order } from '../entity/orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private readonly orderProductsRepository: Repository<OrderProduct>,
    private readonly api: ApiService,
  ) {}

  // Create a new order
  async create(order: CreateOrderDto, customerId: string, customerName: string): Promise<Order> {
    // Validate product availability
    const orderProducts: OrderProduct[] = [];
    let totalAmount = 0;
    const productsAvailability = await this.api.checkProductAvailability(order.products);
    const unavailableItem = productsAvailability.find((item) => !item.is_available);
    if (unavailableItem) {
      throw new BadRequestException(`Insufficient stock for product: ${unavailableItem.id}`);
    }
    // Deduct stock
    await this.api.updateProductsAvailability(order.products);
    // create the order items and
    for (const { id, quantity } of order.products) {
      const product = await this.productsRepository.findOne({ where: { id } });
      if (!product) {
        throw new NotFoundException(`Product with ID not found`);
      }
      // Add to orderProducts
      const orderProduct = this.orderProductsRepository.create({
        product,
        quantity,
      });
      orderProducts.push(orderProduct);

      // Calculate total amount
      totalAmount += product.price * quantity;
    }

    // Create the order
    const newOrder = this.ordersRepository.create({
      customerId,
      customerName,
      shippingAddress: order.shippingAddress,
      billingAddress: order.billingAddress,
      totalAmount,
      status: 'Pending',
      orderProducts,
    });

    return this.ordersRepository.save(newOrder);
  }

  async findAll(customerId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { customerId },
      relations: ['orderProducts', 'orderProducts.product'],
    });
  }

  // Retrieve a single order by ID
  async findOne(orderId: number, customerId: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId, customerId },
      relations: ['orderProducts', 'orderProducts.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found for this user`);
    }
    return order;
  }

  // Update order status
  async update(orderId: number, customerId: string, updatedData: UpdateOrderDto) {
    const results = await this.ordersRepository.update({ id: orderId, customerId }, updatedData);
    return results.affected !== 0;
  }

  async delete(orderId: number, customerId: string): Promise<boolean> {
    const result = await this.ordersRepository.update({ id: orderId, customerId }, { status: 'cancelled' });
    // update quantity again, and add values to stock: either by a kafka message since it's not needed directly, or a request without await
    return result.affected !== 0;
  }
}
