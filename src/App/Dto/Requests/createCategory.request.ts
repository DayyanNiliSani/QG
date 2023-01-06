import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryRequest {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
