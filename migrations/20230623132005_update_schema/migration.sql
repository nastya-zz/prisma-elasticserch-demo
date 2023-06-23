/*
  Warnings:

  - You are about to drop the column `authorId` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `guestIds` on the `chat` table. All the data in the column will be lost.
  - Added the required column `advertisementId` to the `chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyerId` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_authorId_fkey";

-- AlterTable
ALTER TABLE "chat" DROP COLUMN "authorId",
DROP COLUMN "guestIds",
ADD COLUMN     "advertisementId" INTEGER NOT NULL,
ADD COLUMN     "buyerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
