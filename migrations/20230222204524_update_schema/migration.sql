/*
  Warnings:

  - You are about to drop the column `readedUserIds` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "readedUserIds",
ADD COLUMN     "readUserIds" INTEGER[];
