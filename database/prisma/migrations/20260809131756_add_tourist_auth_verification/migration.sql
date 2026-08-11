-- AlterTable
ALTER TABLE `user` ADD COLUMN `phoneVerified` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `AuthVerification` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` ENUM('EMAIL', 'PHONE', 'PASSWORD_RESET') NOT NULL,
    `target` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `verifiedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuthVerification_userId_type_idx`(`userId`, `type`),
    INDEX `AuthVerification_target_type_idx`(`target`, `type`),
    INDEX `AuthVerification_expiresAt_idx`(`expiresAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AuthVerification` ADD CONSTRAINT `AuthVerification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
