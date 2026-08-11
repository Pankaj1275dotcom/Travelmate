-- AlterTable
ALTER TABLE `booking` ADD COLUMN `tripStatus` ENUM('UPCOMING', 'READY_TO_START', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'UPCOMING';

-- CreateTable
CREATE TABLE `TripPass` (
    `id` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `qrToken` VARCHAR(191) NOT NULL,
    `startOtp` VARCHAR(191) NULL,
    `completionOtp` VARCHAR(191) NULL,
    `otpExpiresAt` DATETIME(3) NULL,
    `qrExpiresAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TripPass_bookingId_key`(`bookingId`),
    UNIQUE INDEX `TripPass_qrToken_key`(`qrToken`),
    INDEX `TripPass_bookingId_idx`(`bookingId`),
    INDEX `TripPass_qrToken_idx`(`qrToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TripVerification` (
    `id` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `bookingItemId` VARCHAR(191) NULL,
    `verificationType` ENUM('START', 'COMPLETE') NOT NULL,
    `verificationStatus` ENUM('PENDING', 'VERIFIED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `verifiedBy` ENUM('ADMIN', 'TOURIST', 'HOTEL_OWNER', 'GUIDE', 'DRIVER') NOT NULL,
    `verifiedAt` DATETIME(3) NULL,
    `otp` VARCHAR(191) NULL,
    `qrToken` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TripVerification_bookingId_idx`(`bookingId`),
    INDEX `TripVerification_bookingItemId_idx`(`bookingItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TripTimeline` (
    `id` VARCHAR(191) NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdBy` ENUM('ADMIN', 'TOURIST', 'HOTEL_OWNER', 'GUIDE', 'DRIVER') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TripTimeline_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TripPass` ADD CONSTRAINT `TripPass_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TripVerification` ADD CONSTRAINT `TripVerification_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TripVerification` ADD CONSTRAINT `TripVerification_bookingItemId_fkey` FOREIGN KEY (`bookingItemId`) REFERENCES `BookingItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TripTimeline` ADD CONSTRAINT `TripTimeline_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `Booking`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
