export function isAuthEnabled(): boolean {
  const raw = process.env.AUTH_ENABLED?.trim().toLowerCase();
  return raw === "true" || raw === "1" || raw === "yes";
}
