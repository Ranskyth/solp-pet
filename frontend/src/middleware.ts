import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_solp_pet")?.value
  console.log("request : ",request.url)
  if(!token){
    if(request.nextUrl.pathname == "/login"){
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(token == "123"){
    if(request.nextUrl.pathname == "/"){
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

}
 
export const config = {
  matcher: ['/', '/login'],
}