/*
  Warnings:

  - Changed the type of `rating` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `reviews`
MODIFY COLUMN `rating` DECIMAL(3, 2) NOT NULL;