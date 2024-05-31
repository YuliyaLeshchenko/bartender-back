-- CreateTable
CREATE TABLE "ingredient_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredient_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlassType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlassType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ingredientTypeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurements" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "isMilliliters" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsOnMeasurements" (
    "measurmentId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "cocktailId" INTEGER NOT NULL,

    CONSTRAINT "IngredientsOnMeasurements_pkey" PRIMARY KEY ("measurmentId","ingredientId")
);

-- CreateTable
CREATE TABLE "CocktailInstruction" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "cocktailId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CocktailInstruction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cocktails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "keys" TEXT[],
    "description" TEXT NOT NULL,
    "glassTypeId" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cocktails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ingredient_types_name_key" ON "ingredient_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GlassType_name_key" ON "GlassType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cocktails_name_key" ON "cocktails"("name");

-- AddForeignKey
ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_ingredientTypeId_fkey" FOREIGN KEY ("ingredientTypeId") REFERENCES "ingredient_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsOnMeasurements" ADD CONSTRAINT "IngredientsOnMeasurements_measurmentId_fkey" FOREIGN KEY ("measurmentId") REFERENCES "measurements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsOnMeasurements" ADD CONSTRAINT "IngredientsOnMeasurements_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsOnMeasurements" ADD CONSTRAINT "IngredientsOnMeasurements_cocktailId_fkey" FOREIGN KEY ("cocktailId") REFERENCES "cocktails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CocktailInstruction" ADD CONSTRAINT "CocktailInstruction_cocktailId_fkey" FOREIGN KEY ("cocktailId") REFERENCES "cocktails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cocktails" ADD CONSTRAINT "cocktails_glassTypeId_fkey" FOREIGN KEY ("glassTypeId") REFERENCES "GlassType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
