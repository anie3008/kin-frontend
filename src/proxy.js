import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {

    const session = await auth.api.getSession(
     {   headers: await headers()}
    )

    const user = session?.user
    if(!user) {
 return NextResponse.redirect(new URL('/register', request.url))
    }
  
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ['/events/:path', '/create-event','/joined-events', '/manage-events'],
}