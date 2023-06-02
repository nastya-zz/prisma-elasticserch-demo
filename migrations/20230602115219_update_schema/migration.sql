-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_chatId_fkey";

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "advertisementChatId" TEXT,
ALTER COLUMN "chatId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "advertisement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "isArchive" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "canCall" BOOLEAN NOT NULL DEFAULT true,
    "canMessage" BOOLEAN NOT NULL DEFAULT true,
    "views" INTEGER NOT NULL,
    "uniqueWatchers" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addressId" INTEGER,
    "messageId" TEXT,

    CONSTRAINT "advertisement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advertisement_message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "usreId" INTEGER NOT NULL,
    "chatId" TEXT NOT NULL,
    "readUserIds" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "advertisement_message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advertisement_chat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "advertisementId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "advertisement_chat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "advertisement" ADD CONSTRAINT "advertisement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisement" ADD CONSTRAINT "advertisement_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisement" ADD CONSTRAINT "advertisement_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisement_message" ADD CONSTRAINT "advertisement_message_usreId_fkey" FOREIGN KEY ("usreId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisement_message" ADD CONSTRAINT "advertisement_message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "advertisement_chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisement_chat" ADD CONSTRAINT "advertisement_chat_advertisementId_fkey" FOREIGN KEY ("advertisementId") REFERENCES "advertisement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advertisement_chat" ADD CONSTRAINT "advertisement_chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_advertisementChatId_fkey" FOREIGN KEY ("advertisementChatId") REFERENCES "advertisement_chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
