-- CreateEnum
CREATE TYPE "public"."BudgetLevel" AS ENUM ('FREE', 'ECONOMY', 'UPSCALE', 'LUXURY');

-- CreateEnum
CREATE TYPE "public"."PriceLevel" AS ENUM ('FREE', 'INEXPENSIVE', 'MODERATE', 'EXPENSIVE', 'VERY_EXPENSIVE');

-- CreateTable
CREATE TABLE "public"."User" (
    "uid" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT,
    "avatar" TEXT,
    "provider" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLoginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL DEFAULT 'user',
    "plan" TEXT NOT NULL DEFAULT 'free',

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "place_id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,
    "budget" "public"."BudgetLevel",
    "preferences" JSONB,
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "infants" INTEGER NOT NULL DEFAULT 0,
    "pets" INTEGER NOT NULL DEFAULT 0,
    "setupHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "selectedPlaceIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pendingPlaceIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "manualPlaceIds" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TripRecommendation" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "algoVersion" TEXT NOT NULL,
    "placeIds" TEXT[],
    "scores" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TripPlan" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "planJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TripPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Attraction" (
    "place_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "address" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION,
    "userRatingsTotal" INTEGER,
    "priceLevel" "public"."PriceLevel",
    "types" JSONB,
    "website" TEXT,
    "openingHours" JSONB,
    "regularOpeningHours" JSONB,
    "weekdayDescriptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "photos" JSONB,
    "internationalPhoneNumber" TEXT,
    "allowsDogs" BOOLEAN,
    "hasMenuForChildren" BOOLEAN,
    "isGoodForGroups" BOOLEAN,
    "servesBreakfast" BOOLEAN,
    "servesLunch" BOOLEAN,
    "servesDinner" BOOLEAN,
    "servesDessert" BOOLEAN,
    "servesVegetarianFood" BOOLEAN,
    "evChargeOptions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attraction_pkey" PRIMARY KEY ("place_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "Trip_uid_idx" ON "public"."Trip"("uid");

-- CreateIndex
CREATE INDEX "Trip_destination_idx" ON "public"."Trip"("destination");

-- CreateIndex
CREATE UNIQUE INDEX "TripRecommendation_tripId_key" ON "public"."TripRecommendation"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "TripPlan_tripId_key" ON "public"."TripPlan"("tripId");

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_uid_fkey" FOREIGN KEY ("uid") REFERENCES "public"."User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripRecommendation" ADD CONSTRAINT "TripRecommendation_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TripPlan" ADD CONSTRAINT "TripPlan_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
