/*
  Warnings:

  - You are about to drop the column `addressId` on the `advertisement` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `advertisement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinateX` to the `advertisement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coordinateY` to the `advertisement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_userId_fkey";

-- DropForeignKey
ALTER TABLE "advertisement" DROP CONSTRAINT "advertisement_addressId_fkey";

-- AlterTable
ALTER TABLE "advertisement" DROP COLUMN "addressId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "coordinateX" TEXT NOT NULL,
ADD COLUMN     "coordinateY" TEXT NOT NULL;

-- DropTable
DROP TABLE "address";
