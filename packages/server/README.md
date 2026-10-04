# server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

## Prisma

The Prisma schema is at `prisma/schema.prisma`. Set `DATABASE_URL` in `.env`, then generate the Prisma 7 client with:

```bash
bun run prisma:generate
```

This project was created using `bun init` in bun v1.4.0. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
