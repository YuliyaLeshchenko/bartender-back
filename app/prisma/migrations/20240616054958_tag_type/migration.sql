-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tagTypeId" INTEGER;

-- CreateTable
CREATE TABLE "TagType" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "TagType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tagTypeId_fkey" FOREIGN KEY ("tagTypeId") REFERENCES "TagType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
