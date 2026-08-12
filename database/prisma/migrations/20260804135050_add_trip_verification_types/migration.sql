-- AlterTable
ALTER TABLE `TripVerification` MODIFY `verificationType` ENUM('QR', 'OTP', 'START', 'COMPLETE') NOT NULL;