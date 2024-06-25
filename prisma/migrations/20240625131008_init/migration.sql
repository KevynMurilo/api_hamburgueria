-- CreateEnum
CREATE TYPE "StatusMesa" AS ENUM ('disponivel', 'ocupado');

-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('novo', 'preparo', 'pronto', 'entregue');

-- CreateTable
CREATE TABLE "mesas" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "status" "StatusMesa" NOT NULL,

    CONSTRAINT "mesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "garcons" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "garcons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "id_mesa" INTEGER NOT NULL,
    "id_garcom" INTEGER NOT NULL,
    "hora_pedido" TIMESTAMP(3) NOT NULL,
    "status" "StatusPedido" NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_do_pedidos" (
    "id" SERIAL NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "observacoes" TEXT,

    CONSTRAINT "itens_do_pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "protudos" (
    "id" SERIAL NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "protudos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_adicionais" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "itens_adicionais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_do_pedido_has_item_adicional" (
    "itemDoPedidoId" INTEGER NOT NULL,
    "itemAdicionalId" INTEGER NOT NULL,

    CONSTRAINT "item_do_pedido_has_item_adicional_pkey" PRIMARY KEY ("itemDoPedidoId","itemAdicionalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "garcons_email_key" ON "garcons"("email");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_mesa_fkey" FOREIGN KEY ("id_mesa") REFERENCES "mesas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_garcom_fkey" FOREIGN KEY ("id_garcom") REFERENCES "garcons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_do_pedidos" ADD CONSTRAINT "itens_do_pedidos_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_do_pedidos" ADD CONSTRAINT "itens_do_pedidos_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "protudos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "protudos" ADD CONSTRAINT "protudos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" ADD CONSTRAINT "item_do_pedido_has_item_adicional_itemDoPedidoId_fkey" FOREIGN KEY ("itemDoPedidoId") REFERENCES "itens_do_pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" ADD CONSTRAINT "item_do_pedido_has_item_adicional_itemAdicionalId_fkey" FOREIGN KEY ("itemAdicionalId") REFERENCES "itens_adicionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;