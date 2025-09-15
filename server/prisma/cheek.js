// scripts/check.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const run = async () => {
  const total = await prisma.attraction.count();
  const sfo = await prisma.attraction.findFirst({
    where: { place_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo' }
  });
  console.log({ total, sample: { name: sfo?.name, priceLevel: sfo?.priceLevel, uri: sfo?.googleMapsURI }});
};
run().finally(()=>process.exit(0));
