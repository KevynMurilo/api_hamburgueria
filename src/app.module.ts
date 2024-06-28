import { Module } from '@nestjs/common';
import { GarcomModule } from './modules/garcom/garcom.module';
import { PrismaModule } from './modules/database/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MesaModule } from './modules/mesa/mesa.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { ProdutoHasCategoriaModule } from './modules/produto-has-categoria/produto-has-categoria.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { ItensDoPedidoModule } from './modules/itens-do-pedido/itens-do-pedido.module';
import { ItensAdicionaisModule } from './modules/itens-adicionais/itens-adicionais.module';
import { ItensPedidoHasItensAdicionaisModule } from './modules/itens-pedido-has-itens-adicionais/itens-pedido-has-itens-adicionais.module';

@Module({
  imports: [
    GarcomModule,
    PrismaModule,
    AuthModule,
    MesaModule,
    CategoriaModule,
    ProdutoModule,
    ProdutoHasCategoriaModule,
    PedidoModule,
    ItensDoPedidoModule,
    ItensAdicionaisModule,
    ItensPedidoHasItensAdicionaisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
