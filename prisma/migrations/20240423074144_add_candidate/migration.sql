/*
  Warnings:

  - Added the required column `verify_code` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "verify_code" TEXT NOT NULL;
