-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'SHARED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('RELATIONSHIP', 'FAMILY', 'PET', 'PERSONAL', 'TRAVEL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timelines" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "Category" NOT NULL,
    "visibility" "Visibility" NOT NULL DEFAULT 'PRIVATE',
    "owner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timelines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_members" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "timeline_id" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "timeline_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memories" (
    "id" TEXT NOT NULL,
    "timeline_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "media_urls" TEXT[],
    "mood" TEXT,
    "tags" TEXT[],
    "location_name" TEXT,
    "location_address" TEXT,
    "location_lat" DOUBLE PRECISION,
    "location_lng" DOUBLE PRECISION,
    "location_place_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "memories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "timelines_owner_id_idx" ON "timelines"("owner_id");

-- CreateIndex
CREATE INDEX "timeline_members_user_id_idx" ON "timeline_members"("user_id");

-- CreateIndex
CREATE INDEX "timeline_members_timeline_id_idx" ON "timeline_members"("timeline_id");

-- CreateIndex
CREATE UNIQUE INDEX "timeline_members_user_id_timeline_id_key" ON "timeline_members"("user_id", "timeline_id");

-- CreateIndex
CREATE INDEX "memories_timeline_id_idx" ON "memories"("timeline_id");

-- CreateIndex
CREATE INDEX "memories_user_id_idx" ON "memories"("user_id");

-- CreateIndex
CREATE INDEX "memories_date_idx" ON "memories"("date");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "timelines" ADD CONSTRAINT "timelines_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_members" ADD CONSTRAINT "timeline_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timeline_members" ADD CONSTRAINT "timeline_members_timeline_id_fkey" FOREIGN KEY ("timeline_id") REFERENCES "timelines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memories" ADD CONSTRAINT "memories_timeline_id_fkey" FOREIGN KEY ("timeline_id") REFERENCES "timelines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memories" ADD CONSTRAINT "memories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
