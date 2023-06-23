/*
  Warnings:

  - You are about to drop the column `advertisementChatId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the `advertisement_chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `advertisement_message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "advertisement_chat" DROP CONSTRAINT "advertisement_chat_advertisementId_fkey";

-- DropForeignKey
ALTER TABLE "advertisement_chat" DROP CONSTRAINT "advertisement_chat_userId_fkey";

-- DropForeignKey
ALTER TABLE "advertisement_message" DROP CONSTRAINT "advertisement_message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "advertisement_message" DROP CONSTRAINT "advertisement_message_usreId_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_advertisementChatId_fkey";

-- AlterTable
ALTER TABLE "message" DROP COLUMN "advertisementChatId";

-- DropTable
DROP TABLE "advertisement_chat";

-- DropTable
DROP TABLE "advertisement_message";

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "advertisement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
