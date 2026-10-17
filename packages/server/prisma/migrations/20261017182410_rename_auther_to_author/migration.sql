/*
  Warnings:

  - You are about to drop the column `auther` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `author` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reviews`
RENAME COLUMN `auther` TO `author`;