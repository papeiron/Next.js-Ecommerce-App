/*
  Warnings:

  - You are about to drop the `productcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `productcategory` DROP FOREIGN KEY `ProductCategory_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `productcategory` DROP FOREIGN KEY `ProductCategory_product_id_fkey`;

-- DropTable
DROP TABLE `productcategory`;
