import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const TEST_EMAIL = "db-healthcheck@mindmate.local";

type DbErrorPayload = {
  status: number;
  code: string;
  message: string;
};

function mapPrismaDbError(error: unknown): DbErrorPayload {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    const errorCode = (error as Prisma.PrismaClientInitializationError & { errorCode?: string })
      .errorCode;

    if (errorCode === "P1000") {
      return {
        status: 500,
        code: "P1000",
        message:
          "Database authentication failed. Verify DATABASE_URL and DIRECT_URL credentials.",
      };
    }

    if (errorCode === "P1001") {
      return {
        status: 503,
        code: "P1001",
        message:
          "Database is unreachable. Verify host, port, network access, and SSL settings.",
      };
    }
  }

  const rawMessage = error instanceof Error ? error.message : "Unknown Prisma error";

  if (/P1000/i.test(rawMessage)) {
    return {
      status: 500,
      code: "P1000",
      message:
        "Database authentication failed. Verify DATABASE_URL and DIRECT_URL credentials.",
    };
  }

  if (/P1001/i.test(rawMessage)) {
    return {
      status: 503,
      code: "P1001",
      message:
        "Database is unreachable. Verify host, port, network access, and SSL settings.",
    };
  }

  return {
    status: 500,
    code: "DB_UNKNOWN",
    message: "Unexpected database error",
  };
}

export async function GET() {
  try {
    const upsertedUser = await prisma.user.upsert({
      where: { email: TEST_EMAIL },
      update: { name: "MindMate DB Test User" },
      create: { email: TEST_EMAIL, name: "MindMate DB Test User" },
    });

    const readBackUser = await prisma.user.findUnique({
      where: { email: TEST_EMAIL },
    });

    return NextResponse.json({
      success: true,
      message: "Database read/write check passed",
      data: {
        upsertedUser,
        readBackUser,
      },
    });
  } catch (error: unknown) {
    const mappedError = mapPrismaDbError(error);

    return NextResponse.json(
      {
        success: false,
        error: mappedError.message,
        code: mappedError.code,
      },
      { status: mappedError.status }
    );
  }
}
