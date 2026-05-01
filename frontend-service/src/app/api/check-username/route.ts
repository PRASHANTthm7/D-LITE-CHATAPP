import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/core/auth/supabase-server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username || username.length < 3) {
    return NextResponse.json({ available: false });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username.toLowerCase())
    .maybeSingle();

  if (error) {
    return NextResponse.json({ available: true });
  }

  return NextResponse.json({ available: data === null });
}
