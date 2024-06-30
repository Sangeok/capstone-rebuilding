/*
  Warnings:

  - You are about to drop the `_UserTofacilitys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `facilitys` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_UserTofacilitys" DROP CONSTRAINT "_UserTofacilitys_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserTofacilitys" DROP CONSTRAINT "_UserTofacilitys_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nickname" TEXT NOT NULL;

-- DropTable
DROP TABLE "_UserTofacilitys";

-- DropTable
DROP TABLE "facilitys";

-- CreateTable
CREATE TABLE "Facility" (
    "id" SERIAL NOT NULL,
    "SIGUN_CD" TEXT NOT NULL,
    "SIGUN_NM" TEXT NOT NULL,
    "BIZPLC_NM" TEXT NOT NULL,
    "REFINE_ROADNM_ADDR" TEXT NOT NULL,
    "REFINE_LOTNO_ADDR" TEXT NOT NULL,
    "REFINE_ZIP_CD" TEXT NOT NULL,
    "REFINE_WGS84_LAT" TEXT NOT NULL,
    "REFINE_WGS84_LOGT" TEXT NOT NULL,

    CONSTRAINT "Facility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FacilityToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FacilityToUser_AB_unique" ON "_FacilityToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FacilityToUser_B_index" ON "_FacilityToUser"("B");

-- AddForeignKey
ALTER TABLE "_FacilityToUser" ADD CONSTRAINT "_FacilityToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacilityToUser" ADD CONSTRAINT "_FacilityToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
