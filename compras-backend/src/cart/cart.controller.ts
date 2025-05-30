import { Controller, Post, Get, Param, Delete, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';

@ApiTags('Carrinho')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo carrinho' })
  @ApiBody({ type: CreateCartDto })
  @ApiResponse({ status: 201, description: 'Carrinho criado com sucesso.' })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os carrinhos' })
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um carrinho por ID' })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um carrinho por ID' })
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  @Post(':id/checkout')
  @ApiOperation({ summary: 'Finalizar compra do carrinho' })
  checkout(@Param('id') id: string) {
    return this.cartService.checkout(+id);
  }
}
