import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { themePreferenceSchema } from "@/lib/validations";

export async function GET() {
  try {
    const records = await prisma.themePreference.findMany({
      orderBy: { updatedAt: "desc" },
      take: 20
    });

    return NextResponse.json({ data: records }, { status: 200 });
  } catch (error) {
    console.error("theme preference fetch error", error);
    return NextResponse.json({ error: "Unable to fetch theme preferences" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = themePreferenceSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const preference = await prisma.themePreference.upsert({
      where: { userEmail: parsed.data.userEmail },
      update: {
        reducedMotion: parsed.data.reducedMotion,
        preferredTheme: parsed.data.preferredTheme
      },
      create: parsed.data
    });

    return NextResponse.json({ data: preference }, { status: 200 });
  } catch (error) {
    console.error("theme preference save error", error);
    return NextResponse.json({ error: "Unable to save theme preference" }, { status: 500 });
  }
}
