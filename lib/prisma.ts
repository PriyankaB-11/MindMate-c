import { PrismaClient } from "@prisma/client";

const SUPABASE_POOLER_HOST_MATCH = /pooler\.supabase\.com$/i;

function ensureSupabasePoolerParams(databaseUrl: string): string {
  try {
    const parsed = new URL(databaseUrl);
    if (!SUPABASE_POOLER_HOST_MATCH.test(parsed.hostname)) {
      return databaseUrl;
    }

    parsed.searchParams.set("pgbouncer", "true");
    parsed.searchParams.set("connection_limit", "1");
    parsed.searchParams.set("sslmode", "require");

    return parsed.toString();
  } catch {
    return databaseUrl;
  }
}

const resolvedDatabaseUrl = process.env.DATABASE_URL
  ? ensureSupabasePoolerParams(process.env.DATABASE_URL)
  : undefined;

if (resolvedDatabaseUrl) {
  process.env.DATABASE_URL = resolvedDatabaseUrl;
}

const createPrismaClient = () =>
  new PrismaClient(
    resolvedDatabaseUrl
      ? {
          datasources: {
            db: {
              url: resolvedDatabaseUrl,
            },
          },
        }
      : undefined
  );

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient__: PrismaClient | undefined;
}

export const prisma = globalThis.__prismaClient__ ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prismaClient__ = prisma;
}
