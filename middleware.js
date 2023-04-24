import { NextResponse } from "next/server";

export default async function middleware(req, res) {
  const token = req.cookies.get("token");

  if (!token && req.nextUrl.pathname == "/cart") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`
    );
  }
  if (!token && req.nextUrl.pathname == "/profile") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`
    );
  }
  if (!token && req.nextUrl.pathname == "/profile/addresses") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`
    );
  }
  if (!token && req.nextUrl.pathname == "/profile/orders") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`
    );
  }
  if (!token && req.nextUrl.pathname == "/profile/transactions") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`
    );
  }
  if (!token && req.nextUrl.pathname == "/payment/verify") {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/signin`
    );
  }

  if (token && req.nextUrl.pathname == "/auth/signin") {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}`);
  }

  return NextResponse.next();
}
