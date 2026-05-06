import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard", "/chat", "/groups", "/calls", "/settings", "/ai", "/notifications", "/call"];
const AUTH_PATHS = ["/login", "/signup", "/forgot-password", "/reset-password"];
const MFA_PATHS = ["/setup-authenticator", "/verify-authenticator"];

function isProtected(pathname: string) {
  return PROTECTED_PATHS.some(p => pathname === p || pathname.startsWith(p + "/"));
}

function isAuthPage(pathname: string) {
  return AUTH_PATHS.some(p => pathname.startsWith(p));
}

function isMfaPage(pathname: string) {
  return MFA_PATHS.some(p => pathname.startsWith(p));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Not logged in — redirect to login for protected pages
  if (!user) {
    if (isProtected(pathname) || isMfaPage(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // Logged in — check MFA assurance level
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  const currentLevel = aal?.currentLevel;
  const nextLevel = aal?.nextLevel;

  const needsMfaVerification = currentLevel === "aal1" && nextLevel === "aal2";

  // User has MFA enrolled but hasn't verified this session
  if (needsMfaVerification) {
    if (isProtected(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/verify-authenticator";
      return NextResponse.redirect(url);
    }
    return response;
  }

  // Fully authenticated (aal2 or no MFA enrolled) — redirect away from auth/mfa pages
  if (isAuthPage(pathname) || isMfaPage(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
