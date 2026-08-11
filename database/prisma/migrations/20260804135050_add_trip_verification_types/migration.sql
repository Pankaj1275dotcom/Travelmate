-- AlterTable
ALTER TABLE `tripverification` MODIFY `verificationType` ENUM('QR', 'OTP', 'START', 'COMPLETE') NOT NULL;
