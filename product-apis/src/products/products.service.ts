import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConfigService } from '../common';
import { Product } from '../entity/products.entity';
import { ProductAvailability } from './dto/product-availability.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    private readonly config: ConfigService,
  ) {}

  create(product: Partial<Product>) {
    return this.productsRepository.save(product);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<boolean> {
    const product: Product | null = await this.findOne(id);
    if (product) {
      product.archived = true;
      await this.productsRepository.save(product);
      return true;
    }
    return false;
  }

  async update(id: number, updateData: Partial<Product>): Promise<Product> {
    const product = await this.findOne(id);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    Object.assign(product, updateData);

    return this.productsRepository.save(product);
  }

  async getProductQuantityFromDatabase(productId: number): Promise<number | null> {
    const product = await this.productsRepository.findOne({
      where: { id: productId, archived: false },
      select: ['stock'],
    });

    return product ? product.stock : null;
  }

  async checkProductsAvailability(
    products: ProductAvailability[],
  ): Promise<(ProductAvailability & { is_available: boolean; new_quantity: number })[]> {
    const stockThreshold = this.config.get('quantity_threshold');
    const availabilityPromises = products.map(async (product) => {
      const productId = product.id;

      const stock = await this.getProductQuantityFromDatabase(+productId);
      if (typeof stock === 'number') {
        return {
          ...product,
          new_quantity: stock - product.quantity,
          is_available: stock - product.quantity > stockThreshold,
        };
      }
      throw new HttpException(`Product ${productId} not found or it's archived`, HttpStatus.NOT_FOUND);
    });
    const availabilityResults = await Promise.all(availabilityPromises);
    return availabilityResults;
  }

  async updateProductsAvailability(products: ProductAvailability[]): Promise<{ message: string }> {
    const productsList = await this.checkProductsAvailability(products);
    const unavailableProduct = productsList.find((item) => !item.is_available);
    const queryRunner = this.productsRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      if (unavailableProduct) {
        throw new HttpException(`Product ${unavailableProduct.id} doesn't have enough quantity`, HttpStatus.BAD_REQUEST);
      }
      const updatedProducts = productsList.map(async (product) => {
        await queryRunner.manager.update(Product, product.id, {
          stock: product.new_quantity,
        });
      });
      await Promise.all(updatedProducts);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error instanceof Error) {
        throw new HttpException(`An error occurred while updating product availability: ${error.message}`, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(`Unknown error occurred during the transaction`, HttpStatus.BAD_REQUEST);
      }
    } finally {
      await queryRunner.release();
    }
    return { message: 'Stock updated successfully!' };
  }
}
