import { IsNumber, IsNotEmpty } from 'class-validator';

export class ProductAvailability {
  @IsNotEmpty()
  @IsNumber()
  id!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}
