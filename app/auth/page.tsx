import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck, Sparkles } from "lucide-react";

import {
  signInWithGoogleAction,
  signInWithPasswordAction,
  signUpWithPasswordAction,
} from "@/app/auth/actions";
import { isAuthEnabled } from "@/lib/features/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AuthSearchParams = Promise<{
  message?: string;
  error?: string;
}>;

export default async function AuthPage({
  searchParams,
}: {
  searchParams: AuthSearchParams;
}) {
  const params = await searchParams;
  const authEnabled = isAuthEnabled();

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-honey-border bg-honey-card px-3 py-1.5 text-sm text-honey-text transition hover:border-honey-primary hover:bg-honey-primary/10 hover:text-honey-primary-text active:scale-95"
          >
            <ArrowLeft className="size-4" />
            Back to feed
          </Link>
        </div>

        {!authEnabled ? (
          <div className="rounded-xl border border-honey-primary/40 bg-honey-primary/15 px-4 py-3 text-sm text-honey-primary-text">
            Auth geçici olarak kapalı; entegrasyon korunuyor. Test sürecinde login akışları pasif.
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-honey-border bg-honey-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Welcome to DetailVerse</CardTitle>
              <CardDescription>
                Sign in to vote, join threads, and use your AI credits in the Detail Agent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {params.error ? (
                <div
                  role="alert"
                  className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800"
                >
                  {params.error}
                </div>
              ) : null}

              {params.message ? (
                <div
                  role="status"
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
                >
                  {params.message}
                </div>
              ) : null}

              <form action={signInWithGoogleAction}>
                <Button type="submit" className="h-11 w-full rounded-lg" disabled={!authEnabled}>
                  <Sparkles className="size-4" />
                  Continue with Google
                </Button>
              </form>

              <div className="relative text-center">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-honey-border" />
                <span className="relative bg-honey-card px-2 text-xs tracking-[0.14em] text-honey-text/70 uppercase">
                  Or use email
                </span>
              </div>

              <form action={signInWithPasswordAction} className="space-y-3">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-honey-card-text">Email</span>
                  <Input name="email" type="email" autoComplete="email" required disabled={!authEnabled} />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-honey-card-text">Password</span>
                  <Input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    minLength={6}
                    required
                    disabled={!authEnabled}
                  />
                </label>
                <Button
                  type="submit"
                  variant="secondary"
                  className="h-11 w-full rounded-lg"
                  disabled={!authEnabled}
                >
                  Sign in
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-honey-primary/30 bg-honey-card shadow-[0_0_40px_-24px_rgba(247,206,134,0.35)]">
            <CardHeader>
              <CardTitle>Create your account</CardTitle>
              <CardDescription>
                Start with 10 AI credits and build your detailing reputation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <form action={signUpWithPasswordAction} className="space-y-3">
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-honey-card-text">Email</span>
                  <Input name="email" type="email" autoComplete="email" required disabled={!authEnabled} />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-medium text-honey-card-text">Password</span>
                  <Input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                    disabled={!authEnabled}
                  />
                </label>
                <Button type="submit" className="h-11 w-full rounded-lg" disabled={!authEnabled}>
                  Create account
                </Button>
              </form>

              <div className="rounded-xl border border-honey-border bg-honey-muted p-4 text-sm text-honey-text">
                <p className="mb-2 inline-flex items-center gap-2 text-honey-card-text">
                  <Mail className="size-4 text-honey-primary-text" />
                  Email verification may be required depending on your Supabase settings.
                </p>
                <p className="inline-flex items-center gap-2 text-honey-card-text">
                  <ShieldCheck className="size-4 text-honey-primary-text" />
                  Add <code className="rounded border border-honey-border bg-honey-card px-1 py-0.5">/auth/callback</code> to allowed
                  redirect URLs in Supabase Auth.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
