/*
  Warnings:

  - Added the required column `tipo` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TipoGasto" AS ENUM ('CREDITO', 'DEBITO');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Categoria" ADD VALUE 'ROUPAS';
ALTER TYPE "Categoria" ADD VALUE 'DELIVERY';
ALTER TYPE "Categoria" ADD VALUE 'ROLE';

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "tipo" "TipoGasto" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;
