/*
  Warnings:

  - Added the required column `expirationData` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "expirationData" TIMESTAMP(3) NOT NULL;
