import path from "node:path";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis;

// Turbopack replaces the generated client's `__dirname` with a build-time
// placeholder ("/ROOT/..."), so Prisma resolves a relative sqlite path against a
// directory that does not exist and fails with "Error code 14". Resolve the path
// ourselves against the schema directory, which is what the Prisma CLI does.
function resolveDatabaseUrl(url) {
    if (!url?.startsWith("file:")) return url;

    const filePath = url.slice("file:".length);
    if (path.isAbsolute(filePath)) return url;

    return `file:${path.resolve(process.cwd(), "prisma", filePath)}`;
}

const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({ datasourceUrl: resolveDatabaseUrl(process.env.DATABASE_URL) });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
