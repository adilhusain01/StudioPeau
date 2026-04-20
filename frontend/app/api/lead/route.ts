import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/schema";

/**
 * POST /api/lead
 *
 * Handles lead submissions directly in the Next.js app.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── Validate input ──────────────────────────────────────────────────────
    const parsed = leadFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, phone, package: packageName } = parsed.data as any;

    console.info("[Lead] New submission:", {
      name,
      phone,
      package: packageName,
      timestamp: new Date().toISOString(),
      ip: request.headers.get("x-forwarded-for") ?? "unknown",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been received. We will contact you shortly.",
        leadId: crypto.randomUUID(),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[Lead API] Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}

// Only allow POST
export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
