import { type NextRequest, NextResponse } from "next/server";

import { isAuthEnabled } from "@/lib/features/auth";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  if (!isAuthEnabled()) {
    return NextResponse.next({
      request,
    });
  }

  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
