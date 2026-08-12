-- AlterTable
ALTER TABLE `TripCartItem` ADD COLUMN `driverEndDate` DATETIME(3) NULL,
    ADD COLUMN `driverEndTime` VARCHAR(191) NULL,
    ADD COLUMN `driverStartDate` DATETIME(3) NULL,
    ADD COLUMN `driverStartTime` VARCHAR(191) NULL,
    ADD COLUMN `guideEndDate` DATETIME(3) NULL,
    ADD COLUMN `guideEndTime` VARCHAR(191) NULL,
    ADD COLUMN `guideRequestedHours` INTEGER NULL,
    ADD COLUMN `guideStartDate` DATETIME(3) NULL,
    ADD COLUMN `guideStartTime` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `TripCartItem_guideStartDate_idx` ON `TripCartItem`(`guideStartDate`);

-- CreateIndex
CREATE INDEX `TripCartItem_driverStartDate_idx` ON `TripCartItem`(`driverStartDate`);