-- AlterTable
ALTER TABLE "cocktails" ADD COLUMN     "countOfRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rating" DOUBLE PRECISION;
