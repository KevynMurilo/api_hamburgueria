-- CreateEnum
CREATE TYPE "StatusMesa" AS ENUM ('disponivel', 'ocupada');

-- CreateEnum
CREATE TYPE "StatusPedido" AS ENUM ('pendente', 'finalizado');

-- CreateEnum
CREATE TYPE "StatusMetodoPagamento" AS ENUM ('pix', 'debito', 'credito', 'dinheiro');

-- CreateTable
CREATE TABLE "mesas" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "status" "StatusMesa" NOT NULL DEFAULT 'disponivel',

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
    "numero_mesa" INTEGER NOT NULL,
    "id_garcom" INTEGER NOT NULL,
    "hora_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusPedido" NOT NULL,
    "metodo_pagamento" "StatusMetodoPagamento" NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_do_pedidos" (
    "id" SERIAL NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 1,
    "observacoes" TEXT,

    CONSTRAINT "itens_do_pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "protudos" (
    "id" SERIAL NOT NULL,
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
CREATE TABLE "ProdutoCategoria" (
    "id_produto" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "ProdutoCategoria_pkey" PRIMARY KEY ("id_produto","id_categoria")
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
    "id_item_do_pedido" INTEGER NOT NULL,
    "id_item_adicional" INTEGER NOT NULL,

    CONSTRAINT "item_do_pedido_has_item_adicional_pkey" PRIMARY KEY ("id_item_do_pedido","id_item_adicional")
);

-- CreateIndex
CREATE UNIQUE INDEX "mesas_numero_key" ON "mesas"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "garcons_email_key" ON "garcons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_numero_mesa_fkey" FOREIGN KEY ("numero_mesa") REFERENCES "mesas"("numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_garcom_fkey" FOREIGN KEY ("id_garcom") REFERENCES "garcons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_do_pedidos" ADD CONSTRAINT "itens_do_pedidos_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_do_pedidos" ADD CONSTRAINT "itens_do_pedidos_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "protudos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoCategoria" ADD CONSTRAINT "ProdutoCategoria_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "protudos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoCategoria" ADD CONSTRAINT "ProdutoCategoria_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" ADD CONSTRAINT "item_do_pedido_has_item_adicional_id_item_do_pedido_fkey" FOREIGN KEY ("id_item_do_pedido") REFERENCES "itens_do_pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" ADD CONSTRAINT "item_do_pedido_has_item_adicional_id_item_adicional_fkey" FOREIGN KEY ("id_item_adicional") REFERENCES "itens_adicionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
