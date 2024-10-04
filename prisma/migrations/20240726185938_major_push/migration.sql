/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory_id` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `rating` on the `review` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to drop the `purchasedproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_address_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attributes` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_subcategory_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchasedproduct` DROP FOREIGN KEY `PurchasedProduct_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchasedproduct` DROP FOREIGN KEY `PurchasedProduct_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchasedproduct` DROP FOREIGN KEY `PurchasedProduct_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `subcategory` DROP FOREIGN KEY `SubCategory_parent_id_fkey`;

-- AlterTable
ALTER TABLE `category` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `parent_id` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `status`,
    DROP COLUMN `total_price`,
    ADD COLUMN `delivery_status` ENUM('RECEIVED', 'DRAFT', 'REJECTED', 'COMPLETED', 'IN_QUERY') NOT NULL DEFAULT 'RECEIVED',
    ADD COLUMN `order_status` ENUM('PENDING', 'INPROGRESS', 'SHIPPED', 'COMPLETED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `shipping_address_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `price` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `subcategory_id`,
    ADD COLUMN `attributes` JSON NOT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `rating` DECIMAL(65, 30) NOT NULL;

-- DropTable
DROP TABLE `purchasedproduct`;

-- DropTable
DROP TABLE `subcategory`;

-- CreateTable
CREATE TABLE `Discount` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `discount_percent` DECIMAL(65, 30) NOT NULL,
    `discount_amount` DECIMAL(65, 30) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupon` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `discount_amount` DECIMAL(65, 30) NOT NULL,
    `uses_count` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Coupon_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToDiscount` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CategoryToDiscount_AB_unique`(`A`, `B`),
    INDEX `_CategoryToDiscount_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryToCoupon` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CategoryToCoupon_AB_unique`(`A`, `B`),
    INDEX `_CategoryToCoupon_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DiscountToProduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_DiscountToProduct_AB_unique`(`A`, `B`),
    INDEX `_DiscountToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CouponToProduct` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CouponToProduct_AB_unique`(`A`, `B`),
    INDEX `_CouponToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Category_slug_key` ON `Category`(`slug`);

-- CreateIndex
CREATE INDEX `Category_slug_idx` ON `Category`(`slug`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_shipping_address_id_fkey` FOREIGN KEY (`shipping_address_id`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToDiscount` ADD CONSTRAINT `_CategoryToDiscount_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToDiscount` ADD CONSTRAINT `_CategoryToDiscount_B_fkey` FOREIGN KEY (`B`) REFERENCES `Discount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToCoupon` ADD CONSTRAINT `_CategoryToCoupon_A_fkey` FOREIGN KEY (`A`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToCoupon` ADD CONSTRAINT `_CategoryToCoupon_B_fkey` FOREIGN KEY (`B`) REFERENCES `Coupon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DiscountToProduct` ADD CONSTRAINT `_DiscountToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Discount`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DiscountToProduct` ADD CONSTRAINT `_DiscountToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CouponToProduct` ADD CONSTRAINT `_CouponToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Coupon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CouponToProduct` ADD CONSTRAINT `_CouponToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
