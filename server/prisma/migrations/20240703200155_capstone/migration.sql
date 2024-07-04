/*
  Warnings:

  - You are about to drop the `_FacilityToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FacilityToUser" DROP CONSTRAINT "_FacilityToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FacilityToUser" DROP CONSTRAINT "_FacilityToUser_B_fkey";

-- DropTable
DROP TABLE "_FacilityToUser";

-- CreateTable
CREATE TABLE "_UserFacilities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFacilities_AB_unique" ON "_UserFacilities"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFacilities_B_index" ON "_UserFacilities"("B");

-- AddForeignKey
ALTER TABLE "_UserFacilities" ADD CONSTRAINT "_UserFacilities_A_fkey" FOREIGN KEY ("A") REFERENCES "Facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFacilities" ADD CONSTRAINT "_UserFacilities_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
