import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/product.entity';
import { CreateCartDto } from './create-cart.dto';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const products = await this.productRepository.findByIds(createCartDto.productIds);
    const total = products.reduce((sum, product) => sum + Number(product.price), 0);

    const cart = this.cartRepository.create({ products, total });
    return this.cartRepository.save(cart);
  }

  findAll() {
    return this.cartRepository.find({ relations: ['products'] });
  }

  findOne(id: number) {
    return this.cartRepository.findOne({ where: { id }, relations: ['products'] });
  }

  async remove(id: number) {
    const cart = await this.findOne(id);
    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado');
    }
    return this.cartRepository.remove(cart);
  }

async checkout(id: number) {
  const cart = await this.findOne(id);
  if (!cart) {
    throw new NotFoundException('Carrinho não encontrado');
  }

  for (const product of cart.products) {
    const dbProduct = await this.productRepository.findOne({ where: { id: product.id } });
    if (!dbProduct) {
      throw new NotFoundException(`Produto com id ${product.id} não encontrado`);
    }
    if (dbProduct.stock <= 0) {
      throw new Error(`Produto ${dbProduct.name} está sem estoque`);
    }
    dbProduct.stock -= 1;
    await this.productRepository.save(dbProduct);
  }

    await this.cartRepository.remove(cart);
    return { message: 'Compra finalizada com sucesso!', total: cart.total };
  }
}
