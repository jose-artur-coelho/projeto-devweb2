-- AlterEnum
ALTER TYPE "CowRace" ADD VALUE 'MESTICA';

-- AlterEnum
ALTER TYPE "GoatRace" ADD VALUE 'MESTICA';

-- CreateTable
CREATE TABLE "GoatUpdate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "sick" BOOLEAN NOT NULL,
    "milkQuantity" DOUBLE PRECISION NOT NULL,
    "goatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GoatUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CowUpdate" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "sick" BOOLEAN NOT NULL,
    "milkQuantity" DOUBLE PRECISION NOT NULL,
    "cowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CowUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyCosts" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "laborCosts" DOUBLE PRECISION NOT NULL,
    "feedCosts" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DailyCosts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GoatUpdate" ADD CONSTRAINT "GoatUpdate_goatId_fkey" FOREIGN KEY ("goatId") REFERENCES "Goat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoatUpdate" ADD CONSTRAINT "GoatUpdate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CowUpdate" ADD CONSTRAINT "CowUpdate_cowId_fkey" FOREIGN KEY ("cowId") REFERENCES "Cow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CowUpdate" ADD CONSTRAINT "CowUpdate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyCosts" ADD CONSTRAINT "DailyCosts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
