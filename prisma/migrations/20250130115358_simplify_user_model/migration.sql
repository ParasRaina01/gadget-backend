/*
  Warnings:

  - You are about to drop the column `created_by` on the `gadgets` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `gadgets` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "gadgets" DROP CONSTRAINT "gadgets_created_by_fkey";

-- DropForeignKey
ALTER TABLE "gadgets" DROP CONSTRAINT "gadgets_updated_by_fkey";

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "gadgets" DROP COLUMN "created_by",
DROP COLUMN "updated_by";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "role",
DROP COLUMN "updated_at",
DROP COLUMN "username";

-- DropEnum
DROP TYPE "UserRole";
