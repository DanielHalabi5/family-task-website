/*
  Warnings:

  - You are about to drop the column `content` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `_FamilyMembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_FamilyMembers" DROP CONSTRAINT "_FamilyMembers_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_FamilyMembers" DROP CONSTRAINT "_FamilyMembers_B_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "content",
DROP COLUMN "dueDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "familyId" INTEGER;

-- DropTable
DROP TABLE "public"."_FamilyMembers";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Family"("id") ON DELETE SET NULL ON UPDATE CASCADE;
