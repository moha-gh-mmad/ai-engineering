import { config } from 'dotenv';
import { resolve } from 'node:path';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';

config({
   path: resolve(import.meta.dir, '../.env'),
});

const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

if (password === undefined || !database) {
   throw new Error('Missing DATABASE_PASSWORD or DATABASE_NAME in .env');
}

const adapter = new PrismaMariaDb({
   host: '127.0.0.1',
   port: 3306,
   user: 'root',
   password,
   database,
   connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });
