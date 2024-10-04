/*
  Warnings:

  - You are about to drop the column `category_id` on the `categoryattribute` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_address_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `productattributevalue` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `selected_attributes` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coupon_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_store_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categoryattribute` DROP FOREIGN KEY `CategoryAttribute_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_shipping_address_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `productattributevalue` DROP FOREIGN KEY `ProductAttributeValue_category_attribute_id_fkey`;

-- DropForeignKey
ALTER TABLE `productattributevalue` DROP FOREIGN KEY `ProductAttributeValue_product_id_fkey`;

-- DropIndex
DROP INDEX `CategoryAttribute_category_id_name_key` ON `categoryattribute`;

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `selected_attributes` JSON NOT NULL;

-- AlterTable
ALTER TABLE `categoryattribute` DROP COLUMN `category_id`,
    ADD COLUMN `options` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `discount` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `delivery_status`,
    DROP COLUMN `shipping_address_id`,
    DROP COLUMN `store_id`,
    ADD COLUMN `coupon_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `total_price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `order_store_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `selected_attributes` JSON NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `description` MEDIUMTEXT NOT NULL;

-- AlterTable
ALTER TABLE `productimage` ADD COLUMN `alt` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `store` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `productattributevalue`;

-- CreateTable
CREATE TABLE `ProductAttribute` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `category_attribute_id` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductAttribute_product_id_category_attribute_id_key`(`product_id`, `category_attribute_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryAttributeRelation` (
    `category_id` VARCHAR(191) NOT NULL,
    `category_attribute_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CategoryAttributeRelation_category_id_category_attribute_id_key`(`category_id`, `category_attribute_id`),
    PRIMARY KEY (`category_id`, `category_attribute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderStore` (
    `id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `store_id` VARCHAR(191) NOT NULL,
    `shipping_address_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `OrderStore_order_id_store_id_key`(`order_id`, `store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shipment` (
    `id` VARCHAR(191) NOT NULL,
    `order_store_id` VARCHAR(191) NOT NULL,
    `carrier_id` VARCHAR(191) NULL,
    `tracking_number` VARCHAR(191) NULL,
    `shipping_method` VARCHAR(191) NULL,
    `estimated_delivery` DATETIME(3) NULL,
    `actual_delivery` DATETIME(3) NULL,
    `shipping_cost` DOUBLE NULL,
    `status` ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'RETURNED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Shipment_order_store_id_key`(`order_store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShippingRate` (
    `id` VARCHAR(191) NOT NULL,
    `carrier_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `base_rate` DOUBLE NOT NULL,
    `per_kg_rate` DOUBLE NOT NULL,
    `min_weight` DOUBLE NOT NULL,
    `max_weight` DOUBLE NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ShippingRate_carrier_id_name_key`(`carrier_id`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrier` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `tracking_url` VARCHAR(191) NULL,
    `logo_url` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Carrier_name_key`(`name`),
    UNIQUE INDEX `Carrier_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StoreCarrier` (
    `store_id` VARCHAR(191) NOT NULL,
    `carrier_id` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`store_id`, `carrier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_slug_key` ON `Product`(`slug`);

-- AddForeignKey
ALTER TABLE `ProductAttribute` ADD CONSTRAINT `ProductAttribute_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductAttribute` ADD CONSTRAINT `ProductAttribute_category_attribute_id_fkey` FOREIGN KEY (`category_attribute_id`) REFERENCES `CategoryAttribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryAttributeRelation` ADD CONSTRAINT `CategoryAttributeRelation_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryAttributeRelation` ADD CONSTRAINT `CategoryAttributeRelation_category_attribute_id_fkey` FOREIGN KEY (`category_attribute_id`) REFERENCES `CategoryAttribute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_coupon_id_fkey` FOREIGN KEY (`coupon_id`) REFERENCES `Coupon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderStore` ADD CONSTRAINT `OrderStore_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderStore` ADD CONSTRAINT `OrderStore_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderStore` ADD CONSTRAINT `OrderStore_shipping_address_id_fkey` FOREIGN KEY (`shipping_address_id`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_order_store_id_fkey` FOREIGN KEY (`order_store_id`) REFERENCES `OrderStore`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shipment` ADD CONSTRAINT `Shipment_order_store_id_fkey` FOREIGN KEY (`order_store_id`) REFERENCES `OrderStore`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shipment` ADD CONSTRAINT `Shipment_carrier_id_fkey` FOREIGN KEY (`carrier_id`) REFERENCES `Carrier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShippingRate` ADD CONSTRAINT `ShippingRate_carrier_id_fkey` FOREIGN KEY (`carrier_id`) REFERENCES `Carrier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreCarrier` ADD CONSTRAINT `StoreCarrier_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `Store`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StoreCarrier` ADD CONSTRAINT `StoreCarrier_carrier_id_fkey` FOREIGN KEY (`carrier_id`) REFERENCES `Carrier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
