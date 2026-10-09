-- AlterTable
ALTER TABLE "memories" ADD COLUMN     "location_address" TEXT,
ADD COLUMN     "location_lat" DOUBLE PRECISION,
ADD COLUMN     "location_lng" DOUBLE PRECISION,
ADD COLUMN     "location_name" TEXT,
ADD COLUMN     "location_place_id" TEXT;
