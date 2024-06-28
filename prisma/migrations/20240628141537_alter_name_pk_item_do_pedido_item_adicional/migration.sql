/*
  Warnings:

  - The primary key for the `item_do_pedido_has_item_adicional` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemAdicionalId` on the `item_do_pedido_has_item_adicional` table. All the data in the column will be lost.
  - You are about to drop the column `itemDoPedidoId` on the `item_do_pedido_has_item_adicional` table. All the data in the column will be lost.
  - Added the required column `id_item_adicional` to the `item_do_pedido_has_item_adicional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_item_do_pedido` to the `item_do_pedido_has_item_adicional` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" DROP CONSTRAINT "item_do_pedido_has_item_adicional_itemAdicionalId_fkey";

-- DropForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" DROP CONSTRAINT "item_do_pedido_has_item_adicional_itemDoPedidoId_fkey";

-- AlterTable
ALTER TABLE "item_do_pedido_has_item_adicional" DROP CONSTRAINT "item_do_pedido_has_item_adicional_pkey",
DROP COLUMN "itemAdicionalId",
DROP COLUMN "itemDoPedidoId",
ADD COLUMN     "id_item_adicional" INTEGER NOT NULL,
ADD COLUMN     "id_item_do_pedido" INTEGER NOT NULL,
ADD CONSTRAINT "item_do_pedido_has_item_adicional_pkey" PRIMARY KEY ("id_item_do_pedido", "id_item_adicional");

-- AddForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" ADD CONSTRAINT "item_do_pedido_has_item_adicional_id_item_do_pedido_fkey" FOREIGN KEY ("id_item_do_pedido") REFERENCES "itens_do_pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_do_pedido_has_item_adicional" ADD CONSTRAINT "item_do_pedido_has_item_adicional_id_item_adicional_fkey" FOREIGN KEY ("id_item_adicional") REFERENCES "itens_adicionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
