"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { isAuthEnabled } from "@/lib/features/auth";
import { createClient } from "@/lib/supabase/server";

function toAuthErrorUrl(message: string) {
  return `/auth?error=${encodeURIComponent(message)}`;
}

function ensureAuthEnabled() {
  if (!isAuthEnabled()) {
    redirect("/auth?message=Auth%20temporarily%20disabled%20for%20testing.");
  }
}

export async function signInWithPasswordAction(formData: FormData) {
  ensureAuthEnabled();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(toAuthErrorUrl("Email and password are required."));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(toAuthErrorUrl(error.message));
  }

  redirect("/");
}

export async function signUpWithPasswordAction(formData: FormData) {
  ensureAuthEnabled();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect(toAuthErrorUrl("Email and password are required."));
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    redirect(toAuthErrorUrl(error.message));
  }

  redirect(
    `/auth?message=${encodeURIComponent(
      "Account created. Check your email for verification.",
    )}`,
  );
}

export async function signInWithGoogleAction(formData: FormData) {
  void formData;
  ensureAuthEnabled();
  const supabase = await createClient();
  const headerStore = await headers();

  const origin =
    headerStore.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect(toAuthErrorUrl(error.message));
  }

  if (!data.url) {
    redirect(toAuthErrorUrl("Could not start Google OAuth flow."));
  }

  redirect(data.url);
}

export async function signOutAction(formData: FormData) {
  void formData;
  ensureAuthEnabled();
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
