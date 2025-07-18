/*
  Warnings:

  - The primary key for the `Warranty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Warranty` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `warranty_id` on the `Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `warranty_id` on the `Customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `warranty_id` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_warranty_id_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_warranty_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_warranty_id_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "warranty_id",
ADD COLUMN     "warranty_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "warranty_id",
ADD COLUMN     "warranty_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "warranty_id",
ADD COLUMN     "warranty_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Warranty" DROP CONSTRAINT "Warranty_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Warranty_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Application_warranty_id_key" ON "Application"("warranty_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_warranty_id_key" ON "Customer"("warranty_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_warranty_id_key" ON "Product"("warranty_id");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_warranty_id_fkey" FOREIGN KEY ("warranty_id") REFERENCES "Warranty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_warranty_id_fkey" FOREIGN KEY ("warranty_id") REFERENCES "Warranty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_warranty_id_fkey" FOREIGN KEY ("warranty_id") REFERENCES "Warranty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
