/*
  Warnings:

  - Added the required column `date` to the `Reminder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;
