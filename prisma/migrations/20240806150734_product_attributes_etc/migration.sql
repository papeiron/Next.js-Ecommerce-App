/*
  Warnings:

  - You are about to drop the column `total` on the `cart` table. All the data in the column will be lost.
  - You are about to alter the column `discount_amount` on the `coupon` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to drop the column `discount_amount` on the `discount` table. All the data in the column will be lost.
  - You are about to alter the column `discount_percent` on the `discount` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `price` on the `orderitem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to drop the column `attributes` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `rating` on the `review` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to drop the `_categorytodiscount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_discounttoproduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[discount_id]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[discount_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `store_id` to the `Coupon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_categorytodiscount` DROP FOREIGN KEY `_CategoryToDiscount_A_fkey`;

-- DropForeignKey
ALTER TABLE `_categorytodiscount` DROP FOREIGN KEY `_CategoryToDiscount_B_fkey`;

-- DropForeignKey
ALTER TABLE `_discounttoproduct` DROP FOREIGN KEY `_DiscountToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_discounttoproduct` DROP FOREIGN KEY `_DiscountToProduct_B_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `total`;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `discount_id` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `coupon` ADD COLUMN `store_id` VARCHAR(191) NOT NULL,
    MODIFY `discount_amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `discount` DROP COLUMN `discount_amount`,
    ADD COLUMN `store_id` VARCHAR(191) NOT NULL,
    MODIFY `discount_percent` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `attributes`,
    ADD COLUMN `discount_id` VARCHAR(191) NULL,
    MODIFY `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `rating` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `_categorytodiscount`;

-- DropTable
DROP TABLE `_discounttoproduct`;

-- CreateTable
CREATE TABLE `ProductAttributeValue` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `category_attribute_id` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductAttributeValue_product_id_category_attribute_id_key`(`product_id`, `category_attribute_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryAttribute` (
    `id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `required` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CategoryAttribute_category_id_name_key`(`category_id`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Category_discount_id_key` ON `Category`(`discount_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_discount_id_key` ON `Product`(`discount_id`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `Discount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttributeValue` ADD CONSTRAINT `ProductAttributeValue_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttributeValue` ADD CONSTRAINT `ProductAttributeValue_category_attribute_id_fkey` FOREIGN KEY (`category_attribute_id`) REFERENCES `CategoryAttribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `Discount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryAttribute` ADD CONSTRAINT `CategoryAttribute_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coupon` ADD CONSTRAINT `Coupon_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
