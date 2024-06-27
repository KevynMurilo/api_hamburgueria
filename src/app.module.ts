import { Module } from '@nestjs/common';
import { GarcomModule } from './modules/garcom/garcom.module';
import { PrismaModule } from './modules/database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MesaModule } from './modules/mesa/mesa.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { ProdutoCategoriaModule } from './modules/produto-categoria/produto-categoria.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { ItensDoPedidoModule } from './modules/itens-do-pedido/itens-do-pedido.module';

@Module({
  imports: [GarcomModule, PrismaModule, AuthModule, MesaModule, CategoriaModule, ProdutoModule, ProdutoCategoriaModule, PedidoModule, ItensDoPedidoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
