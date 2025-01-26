/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';

class ProductDto {
  @IsNumber()
  @IsNotEmpty()
  id!: number;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity!: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty({ message: 'Shipping address is required' })
  shippingAddress!: string;

  @IsString()
  @IsNotEmpty({ message: 'Billing address is required' })
  billingAddress!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products!: ProductDto[];
}
