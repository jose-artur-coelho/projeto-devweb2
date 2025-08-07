-- CreateEnum
CREATE TYPE "CowRace" AS ENUM ('HOLANDESA', 'JERSEY', 'GIR', 'GIROLANDO');

-- CreateEnum
CREATE TYPE "GoatRace" AS ENUM ('BOER', 'SAANEN', 'ALPINA', 'ANGLO');

-- CreateTable
CREATE TABLE "Cow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "race" "CowRace" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "race" "GoatRace" NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Goat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cow" ADD CONSTRAINT "Cow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goat" ADD CONSTRAINT "Goat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
