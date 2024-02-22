/*
  Warnings:

  - You are about to drop the column `messsage` on the `LogModel` table. All the data in the column will be lost.
  - Added the required column `message` to the `LogModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LogModel" DROP COLUMN "messsage",
ADD COLUMN     "message" VARCHAR(255) NOT NULL;
