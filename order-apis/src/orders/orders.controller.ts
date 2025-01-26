import { Controller, Post, Body, UseGuards, Get, Param, Delete, HttpStatus, HttpException, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiBody } from '@nestjs/swagger';

import { Payload } from '../auth';
import { ReqUser, Roles, RolesGuard } from '../common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles('user')
  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiBody({ type: CreateOrderDto }) // Document the request body
  create(@ReqUser() user: Payload, @Body() order: CreateOrderDto) {
    return this.ordersService.create(order, user.userId, user.username);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders for the user' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  findAll(@ReqUser() user: Payload) {
    return this.ordersService.findAll(user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific order by ID' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiParam({ name: 'id', description: 'Order ID', type: Number })
  findOne(@ReqUser() user: Payload, @Param('id') id: number) {
    return this.ordersService.findOne(id, user.userId);
  }

  @Roles('user')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({ status: 200, description: 'Order successfully deleted' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiParam({ name: 'id', description: 'Order ID', type: Number })
  async deleteOrder(@ReqUser() user: Payload, @Param('id') id: number): Promise<{ message: string }> {
    const isDeleted = await this.ordersService.delete(+id, user.userId);
    if (!isDeleted) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Order successfully deleted' };
  }

  @Roles('user')
  @Put(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiResponse({ status: 200, description: 'Order successfully updated' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiParam({ name: 'id', description: 'Order ID', type: String })
  async updateOrder(@ReqUser() user: Payload, @Param('id') id: string, @Body() updateData: UpdateOrderDto) {
    const isUpdated = await this.ordersService.update(+id, user.userId, updateData);
    if (!isUpdated) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Order successfully updated' };
  }
}
