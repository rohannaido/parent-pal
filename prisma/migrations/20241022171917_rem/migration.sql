/*
  Warnings:

  - You are about to drop the column `date` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Reminder` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;
