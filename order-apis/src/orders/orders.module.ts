import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ApiModule } from '../api/api.module';
import { Product, Order, OrderProduct } from '../entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Order, OrderProduct]), ApiModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
