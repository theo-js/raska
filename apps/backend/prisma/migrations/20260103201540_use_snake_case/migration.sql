/*
  Warnings:

  - You are about to drop the column `authorId` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the column `storagePath` on the `Recording` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isBanned` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storage_path]` on the table `Recording` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_id` to the `Recording` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storage_path` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recording" DROP CONSTRAINT "Recording_authorId_fkey";

-- DropIndex
DROP INDEX "Recording_storagePath_key";

-- AlterTable
ALTER TABLE "Recording" DROP COLUMN "authorId",
DROP COLUMN "storagePath",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "storage_path" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatarUrl",
DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "isBanned",
DROP COLUMN "phoneNumber",
DROP COLUMN "updatedAt",
ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "is_banned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone_number" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Recording_storage_path_key" ON "Recording"("storage_path");

-- AddForeignKey
ALTER TABLE "Recording" ADD CONSTRAINT "Recording_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
