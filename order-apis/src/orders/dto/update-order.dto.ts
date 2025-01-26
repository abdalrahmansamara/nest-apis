import { IsString, ValidateIf } from 'class-validator';

export class UpdateOrderDto {
  @ValidateIf((o) => !o.billingAddress)
  @IsString()
  shippingAddress!: string;

  @ValidateIf((o) => !o.shippingAddress)
  @IsString()
  billingAddress!: string;
}
