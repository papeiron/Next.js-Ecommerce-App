/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `categories` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Adresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adresses` ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `deleted_at`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `content` VARCHAR(191) NOT NULL;
