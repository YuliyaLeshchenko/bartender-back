-- AlterTable
ALTER TABLE "cocktails" ADD COLUMN     "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CocktailToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CocktailToTag_AB_unique" ON "_CocktailToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_CocktailToTag_B_index" ON "_CocktailToTag"("B");

-- AddForeignKey
ALTER TABLE "_CocktailToTag" ADD CONSTRAINT "_CocktailToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "cocktails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CocktailToTag" ADD CONSTRAINT "_CocktailToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
