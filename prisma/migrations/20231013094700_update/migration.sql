-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "file" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "employeeId" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Contract" ("createdAt", "employeeId", "endDate", "file", "id", "startDate", "type", "updatedAt") SELECT "createdAt", "employeeId", "endDate", "file", "id", "startDate", "type", "updatedAt" FROM "Contract";
DROP TABLE "Contract";
ALTER TABLE "new_Contract" RENAME TO "Contract";
CREATE TABLE "new_PaySlip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "salary" TEXT NOT NULL,
    "file" TEXT,
    "payementDate" DATETIME NOT NULL,
    "comment" TEXT,
    "employeeId" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PaySlip_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PaySlip" ("comment", "createdAt", "employeeId", "file", "id", "payementDate", "salary", "updatedAt") SELECT "comment", "createdAt", "employeeId", "file", "id", "payementDate", "salary", "updatedAt" FROM "PaySlip";
DROP TABLE "PaySlip";
ALTER TABLE "new_PaySlip" RENAME TO "PaySlip";
CREATE TABLE "new_Sanction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "file" TEXT,
    "type" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "employeeId" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Sanction_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Sanction" ("createdAt", "employeeId", "endDate", "file", "id", "startDate", "status", "type", "updatedAt") SELECT "createdAt", "employeeId", "endDate", "file", "id", "startDate", "status", "type", "updatedAt" FROM "Sanction";
DROP TABLE "Sanction";
ALTER TABLE "new_Sanction" RENAME TO "Sanction";
CREATE TABLE "new_PayDayAdvance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "file" TEXT,
    "payementDate" DATETIME NOT NULL,
    "motif" TEXT,
    "employeeId" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PayDayAdvance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PayDayAdvance" ("createdAt", "employeeId", "file", "id", "motif", "payementDate", "updatedAt", "value") SELECT "createdAt", "employeeId", "file", "id", "motif", "payementDate", "updatedAt", "value" FROM "PayDayAdvance";
DROP TABLE "PayDayAdvance";
ALTER TABLE "new_PayDayAdvance" RENAME TO "PayDayAdvance";
CREATE TABLE "new_Leave" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "file" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "motif" TEXT,
    "employeeId" TEXT,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Leave_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Leave" ("createdAt", "employeeId", "endDate", "file", "id", "motif", "startDate", "status", "updatedAt") SELECT "createdAt", "employeeId", "endDate", "file", "id", "motif", "startDate", "status", "updatedAt" FROM "Leave";
DROP TABLE "Leave";
ALTER TABLE "new_Leave" RENAME TO "Leave";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
