-- AlterTable
ALTER TABLE `order` ADD COLUMN `quantity` INTEGER NULL;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `productId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
