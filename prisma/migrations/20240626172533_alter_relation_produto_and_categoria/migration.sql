/*
  Warnings:

  - You are about to drop the column `id_categoria` on the `protudos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `categorias` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "protudos" DROP CONSTRAINT "protudos_id_categoria_fkey";

-- AlterTable
ALTER TABLE "protudos" DROP COLUMN "id_categoria";

-- CreateTable
CREATE TABLE "ProdutoCategoria" (
    "id_produto" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "ProdutoCategoria_pkey" PRIMARY KEY ("id_produto","id_categoria")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- AddForeignKey
ALTER TABLE "ProdutoCategoria" ADD CONSTRAINT "ProdutoCategoria_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "protudos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoCategoria" ADD CONSTRAINT "ProdutoCategoria_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
