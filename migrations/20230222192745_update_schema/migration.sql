/*
  Warnings:

  - You are about to drop the column `guests` on the `chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chat" DROP COLUMN "guests",
ADD COLUMN     "guestIds" INTEGER[];
