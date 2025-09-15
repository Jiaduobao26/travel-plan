import { PrismaClient } from "@prisma/client";

console.log("正在初始化 PrismaClient...");

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

console.log("PrismaClient 初始化完成");

async function main() {
    console.log("开始执行 seed 操作...");

    // 先测试数据库连接
    await prisma.$connect();
    console.log("数据库连接成功");

    const attraction = await prisma.attraction.upsert({
        where: { place_id: "ChIJIQBpAG2ahYAR_6128GcTUEo" },
        update: {},
        create: {
            place_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
            name: "Golden Gate Bridge",
            category: "Historical Site",
            lat: 37.8199,
            lng: -122.4783,
            rating: 4.8,
            userRatingsTotal: 120000,
            priceLevel: "FREE",
            allowsDogs: false,
            isGoodForGroups: true,
            regularOpeningHours: {
                periods: [
                    { openDay: 0, openTime: "0000", closeDay: 6, closeTime: "2359" }
                ]
            }
        }
    });

    console.log("创建/更新了景点:", attraction.name);
}

main()
    .then(() => {
        console.log("Seed 执行完成");
    })
    .catch((e) => {
        console.error("Seed 执行出错:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("数据库连接已断开");
    });