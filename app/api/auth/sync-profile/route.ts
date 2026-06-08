import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "mockKeyPart1.mockKeyPart2.mockKeyPart3";

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const body = await request.json();
    const { id, fullName, email, phoneNo, dob, locationCity, pincode } = body;

    if (!id || !fullName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Verify JWT token using Supabase Auth
    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user || user.id !== id) {
      console.error("JWT verification failed:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user already exists in public.users
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: "Profile already exists",
      });
    }

    // Insert new profile using service role (bypasses RLS)
    const { error: insertError } = await supabaseAdmin.from("users").insert({
      id,
      full_name: fullName,
      email,
      phone_no: phoneNo || `google_${id.slice(0, 8)}`,
      dob: dob || "2000-01-01",
      location_city: locationCity || "Unknown",
      pincode: pincode || "000000",
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error("Failed to insert profile via API:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile saved successfully",
    });
  } catch (error) {
    console.error("Sync profile API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
