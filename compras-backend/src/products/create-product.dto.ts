import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Celular', description: 'Nome do produto' })
  name: string;

  @ApiProperty({ example: 1500, description: 'Preço do produto' })
  price: number;

  @ApiProperty({ example: 'Smartphone top de linha', description: 'Descrição do produto' })
  description: string;

  @ApiProperty({ example: 10, description: 'Quantidade em estoque' })
  stock: number;
}
