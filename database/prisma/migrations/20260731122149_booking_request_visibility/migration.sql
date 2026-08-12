-- AlterTable
ALTER TABLE `BookingRequest` ADD COLUMN `hiddenForDriver` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `hiddenForGuide` BOOLEAN NOT NULL DEFAULT false;