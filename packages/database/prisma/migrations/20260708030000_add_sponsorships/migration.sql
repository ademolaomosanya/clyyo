-- CreateEnum
CREATE TYPE "SponsorshipStatus" AS ENUM ('active', 'paused', 'ended');

-- CreateTable
CREATE TABLE "sponsorships" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "sponsorId" TEXT NOT NULL,
    "packageName" TEXT NOT NULL,
    "visibilityTier" TEXT NOT NULL,
    "status" "SponsorshipStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sponsorships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sponsorships_eventId_sponsorId_key" ON "sponsorships"("eventId", "sponsorId");

-- CreateIndex
CREATE INDEX "sponsorships_eventId_idx" ON "sponsorships"("eventId");

-- CreateIndex
CREATE INDEX "sponsorships_sponsorId_idx" ON "sponsorships"("sponsorId");

-- AddForeignKey
ALTER TABLE "sponsorships" ADD CONSTRAINT "sponsorships_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sponsorships" ADD CONSTRAINT "sponsorships_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
