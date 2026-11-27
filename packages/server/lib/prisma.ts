import { config } from 'dotenv';
import { resolve } from 'node:path';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';

config({
   path: resolve(import.meta.dir, '../.env'),
});

const host = process.env.DATABASE_HOST ?? '127.0.0.1';
const port = Number(process.env.DATABASE_PORT ?? 3306);
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
const database = process.env.DATABASE_NAME;

if (!user || password === undefined || !database) {
   throw new Error('Missing database configuration in .env');
}

if (!Number.isInteger(port) || port < 1 || port > 65535) {
   throw new Error('Invalid DATABASE_PORT');
}

const adapter = new PrismaMariaDb({
   host,
   port,
   user,
   password,
   database,
   connectionLimit: 2,
});

export const prisma = new PrismaClient({ adapter });
