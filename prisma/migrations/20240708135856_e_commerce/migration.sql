/*
  Warnings:

  - You are about to drop the column `content` on the `review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,product_id]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `comment` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_user_id_fkey`;

-- DropIndex
DROP INDEX `Product_name_key` ON `product`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `subcategory_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `content`,
    ADD COLUMN `comment` VARCHAR(191) NOT NULL,
    ADD COLUMN `rating` INTEGER NOT NULL,
    MODIFY `user_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PurchasedProduct` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PurchasedProduct_user_id_product_id_key`(`user_id`, `product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Review_user_id_product_id_key` ON `Review`(`user_id`, `product_id`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subcategory_id_fkey` FOREIGN KEY (`subcategory_id`) REFERENCES `SubCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedProduct` ADD CONSTRAINT `PurchasedProduct_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedProduct` ADD CONSTRAINT `PurchasedProduct_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchasedProduct` ADD CONSTRAINT `PurchasedProduct_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
