-- DropForeignKey
ALTER TABLE IF EXISTS "reviews" DROP CONSTRAINT IF EXISTS "reviews_applicationId_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "reviews" DROP CONSTRAINT IF EXISTS "reviews_reviewerId_fkey";

-- DropTable
DROP TABLE IF EXISTS "reviews";
