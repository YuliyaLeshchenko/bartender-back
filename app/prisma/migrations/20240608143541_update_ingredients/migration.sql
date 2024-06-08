/*
  Warnings:

  - The primary key for the `IngredientsOnMeasurements` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "IngredientsOnMeasurements" DROP CONSTRAINT "IngredientsOnMeasurements_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "IngredientsOnMeasurements_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "cocktails" ADD COLUMN     "rating" DOUBLE PRECISION;
