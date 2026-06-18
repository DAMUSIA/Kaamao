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

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ liked: false });
    }
    const token = authHeader.split(" ")[1];
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ liked: false });
    }

    const url = new URL(request.url);
    const serviceId = url.searchParams.get("serviceId");
    if (!serviceId) {
      return NextResponse.json({ error: "Missing serviceId" }, { status: 400 });
    }

    const { data } = await supabaseAdmin
      .from("service_likes")
      .select("id")
      .eq("service_id", serviceId)
      .eq("user_id", user.id)
      .maybeSingle();

    return NextResponse.json({ liked: !!data });
  } catch {
    return NextResponse.json({ liked: false });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { serviceId, action } = body; // action: 'like' | 'unlike'
    if (!serviceId || !action) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    if (action === "like") {
      const { error: insertError } = await supabaseAdmin
        .from("service_likes")
        .insert({ service_id: serviceId, user_id: user.id });

      if (insertError && !insertError.message.includes("unique")) {
        return NextResponse.json({ error: insertError.message }, { status: 550 });
      }
    } else {
      await supabaseAdmin
        .from("service_likes")
        .delete()
        .eq("service_id", serviceId)
        .eq("user_id", user.id);
    }

    // Get current exact count
    const { count } = await supabaseAdmin
      .from("service_likes")
      .select("*", { count: "exact", head: true })
      .eq("service_id", serviceId);

    const totalLikes = count || 0;

    // Update services table
    await supabaseAdmin
      .from("services")
      .update({ likes_count: totalLikes })
      .eq("id", serviceId);

    // Update service_analytics table
    const { data: analyticsRow } = await supabaseAdmin
      .from("service_analytics")
      .select("*")
      .eq("service_id", serviceId)
      .maybeSingle();

    if (analyticsRow) {
      await supabaseAdmin
        .from("service_analytics")
        .update({
          total_likes: totalLikes,
          updated_at: new Date().toISOString()
        })
        .eq("service_id", serviceId);
    } else {
      await supabaseAdmin
        .from("service_analytics")
        .insert({
          service_id: serviceId,
          total_likes: totalLikes,
          updated_at: new Date().toISOString()
        });
    }

    return NextResponse.json({ success: true, likesCount: totalLikes });
  } catch (error: unknown) {
    console.error("Likes API error:", error);
    const err = error as { message?: string } | null;
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
