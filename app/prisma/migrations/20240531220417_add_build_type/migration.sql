/*
  Warnings:

  - Added the required column `buildTypeId` to the `cocktails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cocktails" ADD COLUMN     "buildTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "BuildType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuildType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BuildType_name_key" ON "BuildType"("name");

-- AddForeignKey
ALTER TABLE "cocktails" ADD CONSTRAINT "cocktails_buildTypeId_fkey" FOREIGN KEY ("buildTypeId") REFERENCES "BuildType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
