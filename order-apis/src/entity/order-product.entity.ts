import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './orders.entity';
import { Product } from './products.entity';

@Entity('order_products')
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.orderProducts, { onDelete: 'CASCADE' })
  order!: Order;

  @ManyToOne(() => Product, (product: Product) => product.orderProducts, { onDelete: 'CASCADE' })
  product!: Product;

  @Column({ type: 'int' })
  quantity!: number;
}
