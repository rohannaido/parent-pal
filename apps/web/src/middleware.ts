import { NextRequest } from "next/server";

export const config = {
    matcher: '/api/:function*',
}

export { default } from "next-auth/middleware"