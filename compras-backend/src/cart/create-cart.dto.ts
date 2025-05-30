import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({
    example: [1, 2],
    description: 'Lista de IDs dos produtos adicionados ao carrinho',
  })
  productIds: number[];
}
