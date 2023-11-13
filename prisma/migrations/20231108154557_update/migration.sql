/*
  Warnings:

  - You are about to alter the column `status` on the `Leave` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.
  - You are about to drop the column `type` on the `Sanction` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Sanction` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- AlterTable
ALTER TABLE "Contract" ADD COLUMN "isNew" BOOLEAN DEFAULT false;
ALTER TABLE "Contract" ADD COLUMN "status" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN "profil" TEXT;

-- CreateTable
CREATE TABLE "OtherDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document" TEXT NOT NULL,
    "isExpired" BOOLEAN DEFAULT false,
    "comment" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "employeeId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isNew" BOOLEAN DEFAULT false,
    "otherDocumentTypeId" TEXT NOT NULL,
    CONSTRAINT "OtherDocument_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OtherDocument_otherDocumentTypeId_fkey" FOREIGN KEY ("otherDocumentTypeId") REFERENCES "OtherDocumentType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OtherDocumentType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Leave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" BOOLEAN DEFAULT false,
    "motif" TEXT,
    "file" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "employeeId" TEXT,
    "isNew" BOOLEAN DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Leave_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Leave" ("createdAt", "employeeId", "endDate", "file", "id", "motif", "startDate", "status", "updatedAt") SELECT "createdAt", "employeeId", "endDate", "file", "id", "motif", "startDate", "status", "updatedAt" FROM "Leave";
DROP TABLE "Leave";
ALTER TABLE "new_Leave" RENAME TO "Leave";
CREATE TABLE "new_Sanction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" BOOLEAN DEFAULT false,
    "motif" TEXT,
    "file" TEXT,
    "startDate" TEXT,
    "endDate" TEXT,
    "employeeId" TEXT,
    "isNew" BOOLEAN DEFAULT false,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Sanction_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Sanction" ("createdAt", "employeeId", "endDate", "file", "id", "startDate", "status", "updatedAt") SELECT "createdAt", "employeeId", "endDate", "file", "id", "startDate", "status", "updatedAt" FROM "Sanction";
DROP TABLE "Sanction";
ALTER TABLE "new_Sanction" RENAME TO "Sanction";
CREATE TABLE "new_PaySlip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "salary" TEXT NOT NULL,
    "file" TEXT,
    "payementDate" TEXT NOT NULL,
    "comment" TEXT,
    "employeeId" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PaySlip_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PaySlip" ("comment", "createdAt", "employeeId", "file", "id", "payementDate", "salary", "updatedAt") SELECT "comment", "createdAt", "employeeId", "file", "id", "payementDate", "salary", "updatedAt" FROM "PaySlip";
DROP TABLE "PaySlip";
ALTER TABLE "new_PaySlip" RENAME TO "PaySlip";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "OtherDocumentType_name_key" ON "OtherDocumentType"("name");
