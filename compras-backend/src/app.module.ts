import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { Cart } from './cart/cart.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Product, Cart],
      synchronize: true,
    }),
    ProductsModule,
    CartModule,
  ],
})
export class AppModule {}
