import { Controller, Get, Post, Body, Param, UseGuards, Delete, HttpException, HttpStatus, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

import { Roles, RolesGuard } from '../common';
import { ProductsService } from './products.service';
import { Product } from '../entity/products.entity';
import { ProductAvailability } from './dto/product-availability.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('admin')
  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiBody({ type: Product }) // Document the request body
  create(@Body() product: Partial<Product>) {
    return this.productsService.create(product);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product ID', type: Number })
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Roles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    const isDeleted = await this.productsService.delete(+id);
    if (!isDeleted) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Product successfully deleted' };
  }

  @Roles('server')
  @Put('stock')
  @ApiOperation({ summary: 'Update stock availability for multiple products' })
  @ApiResponse({ status: 200, description: 'Stock availability updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiBody({ type: [ProductAvailability] })
  async updateProductsAvailability(@Body() products: ProductAvailability[]): Promise<{ message: string }> {
    const message = await this.productsService.updateProductsAvailability(products);
    return message;
  }

  @Roles('admin')
  @Put(':id')
  @ApiOperation({ summary: 'Update a specific product by ID' })
  @ApiResponse({ status: 200, description: 'Product successfully updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: 'id', description: 'Product ID', type: String })
  async updateProduct(@Param('id') id: string, @Body() updateData: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productsService.update(+id, updateData);
    return updatedProduct;
  }

  @Roles('server')
  @Post('check-availability')
  @ApiOperation({ summary: 'Check availability for multiple products' })
  @ApiResponse({
    status: 200,
    description: 'Availability status for products retrieved successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiBody({ type: [ProductAvailability] })
  async checkProductsAvailability(
    @Body() products: ProductAvailability[],
  ): Promise<(ProductAvailability & { is_available: boolean; new_quantity: number })[]> {
    const updatedProduct = await this.productsService.checkProductsAvailability(products);
    return updatedProduct;
  }
}
