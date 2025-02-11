import { NextResponse } from "next/server";

export function middleware(request) {
  // 기존 요청 헤더 설정
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("next-url", request.nextUrl.pathname);

  // 응답 생성
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // // Content-Security-Policy 및 X-Frame-Options 헤더 추가
  // response.headers.set(
  //   "Content-Security-Policy",
  //   "frame-ancestors 'self' https://*.teams.microsoft.com;"
  // );
  // response.headers.set(
  //   "X-Frame-Options",
  //   "ALLOW-FROM https://teams.microsoft.com"
  // );

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ], // ✅ 모든 경로에서 실행
};
