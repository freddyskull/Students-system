/*
  Warnings:

  - You are about to alter the column `cedula` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `fullName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cedula" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Users" ("avatar", "cedula", "createdAt", "id", "password", "updateAt") SELECT "avatar", "cedula", "createdAt", "id", "password", "updateAt" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_cedula_key" ON "Users"("cedula");
CREATE UNIQUE INDEX "Users_userName_key" ON "Users"("userName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
