const { PrismaClient } = require('@prisma/client');
const { tasks } = require('./data');
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.task.createMany({
            data: tasks
        });
        console.log('seeded db')
    
    } catch (error) {
        console.log('Error', error);
        process.exit(1);
    
    } finally {
        await prisma.$disconnect();
    }
};

load();
