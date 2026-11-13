import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "./lib/utils";

function isTokenExpired(token: string) {
  try {
    const payloadBase64 = token
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const binary = atob(payloadBase64);
    const buffer = Uint8Array.from(binary, (c) => c.codePointAt(0) ?? 0);
    const payload = JSON.parse(new TextDecoder().decode(buffer));

    // Refresh 15 seconds before expiry
    return payload.exp * 1000 <= Date.now() + 15000;
  } catch {
    return true;
  }
}

export async function proxy(request: NextRequest) {
  const access = request.cookies.get("access")?.value;
  const refresh = request.cookies.get("refresh")?.value;

  if (!refresh || isTokenExpired(refresh)) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("access");
    response.cookies.delete("refresh");
    return response;
  }

  
    if(!access || isTokenExpired(access)){
      try {
      const refreshResponse = await fetch(
      `${API_BASE_URL}/users/login/refresh/`,
      {
        method: "POST",
        headers: {
          Cookie: `refresh=${refresh}`,
        },
        cache: "no-store",
      }
    );

    if (!refreshResponse.ok) {
      throw new Error("Refresh failed");
    }

    const refPayload = await refreshResponse.json();
    const newAccess = refPayload.access;
    const newRefresh = refPayload.refresh;

    const headers = new Headers(request.headers);
    headers.set("Cookie", `access=${newAccess}`);
    const response = NextResponse.next({
      request: {
        headers,
      },
    });
    response.cookies.set("access", newAccess, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 5,
    });

      response.cookies.set("refresh", newRefresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

    return response;
  } catch {
    const response = NextResponse.redirect(
      new URL("/auth/login", request.url)
    );

    response.cookies.delete("access");
    response.cookies.delete("refresh");

    return response;
  }
    }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth/login|auth/register|$).*)",
  ],
};
