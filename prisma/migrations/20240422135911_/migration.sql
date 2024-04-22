/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "number" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_number_key" ON "Candidate"("number");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");
