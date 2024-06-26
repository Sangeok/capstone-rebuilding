/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "facilitys" (
    "id" SERIAL NOT NULL,
    "SIGUN_CD" TEXT NOT NULL,
    "SIGUN_NM" TEXT NOT NULL,
    "BIZPLC_NM" TEXT NOT NULL,
    "REFINE_ROADNM_ADDR" TEXT NOT NULL,
    "REFINE_LOTNO_ADDR" TEXT NOT NULL,
    "REFINE_ZIP_CD" TEXT NOT NULL,
    "REFINE_WGS84_LAT" TEXT NOT NULL,
    "REFINE_WGS84_LOGT" TEXT NOT NULL,

    CONSTRAINT "facilitys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserTofacilitys" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserTofacilitys_AB_unique" ON "_UserTofacilitys"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTofacilitys_B_index" ON "_UserTofacilitys"("B");

-- AddForeignKey
ALTER TABLE "_UserTofacilitys" ADD CONSTRAINT "_UserTofacilitys_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTofacilitys" ADD CONSTRAINT "_UserTofacilitys_B_fkey" FOREIGN KEY ("B") REFERENCES "facilitys"("id") ON DELETE CASCADE ON UPDATE CASCADE;
