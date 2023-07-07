/*
  Warnings:

  - You are about to drop the column `description` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `description`,
    DROP COLUMN `image`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    DROP COLUMN `quantity`,
    ADD COLUMN `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `orderdetail` ADD COLUMN `orderId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Warehouse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `price` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,
    `productId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Warehouse` ADD CONSTRAINT `Warehouse_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
