import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // IMPORTANTE
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // opcional, caso outros módulos precisem
})
export class ProductsModule {}
