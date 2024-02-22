-- CreateEnum
CREATE TYPE "SeverityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "LogModel" (
    "id" SERIAL NOT NULL,
    "messsage" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "origin" VARCHAR(255) NOT NULL,
    "level" "SeverityLevel" NOT NULL,

    CONSTRAINT "LogModel_pkey" PRIMARY KEY ("id")
);
