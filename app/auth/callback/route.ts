import { NextResponse } from "next/server";

import { isAuthEnabled } from "@/lib/features/auth";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  if (!isAuthEnabled()) {
    return NextResponse.redirect(
      new URL("/auth?message=Auth%20temporarily%20disabled%20for%20testing.", request.url),
    );
  }

  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(new URL("/auth?error=Missing OAuth code.", request.url));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/auth?error=${encodeURIComponent(error.message)}`, request.url),
    );
  }

  return NextResponse.redirect(new URL(next, request.url));
}
