/*
Warnings:

- The values [EXPIRED] on the enum `BookingRequest_status` will be removed. If these variants are still used in the database, this will fail.
- The values [EXPIRED] on the enum `BookingRequest_status` will be removed. If these variants are still used in the database, this will fail.
*/

-- AlterTable
ALTER TABLE `BookingRequest` MODIFY `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'PAYMENT_EXPIRED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `TripCartItem` MODIFY `requestStatus` ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'PAYMENT_EXPIRED', 'CANCELLED') NULL;