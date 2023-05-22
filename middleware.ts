import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
    
  const { data: { session } } = await supabase.auth.getSession(); // destructure the data object to obtain the session object
  
  if (session === null) return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
    
  return res;
}
    
export const config = {
  matcher: ["/bills/add"], // add the routes you wish the middleware to run in. You can also use regex
};