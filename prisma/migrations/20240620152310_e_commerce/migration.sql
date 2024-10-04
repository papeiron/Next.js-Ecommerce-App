/*
  Warnings:

  - Added the required column `order_no` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `order_no` VARCHAR(191) NOT NULL;
