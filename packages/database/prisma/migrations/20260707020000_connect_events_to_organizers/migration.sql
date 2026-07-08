-- AlterTable
ALTER TABLE "events" ADD COLUMN "organizerId" TEXT;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "events_organizerId_idx" ON "events"("organizerId");
