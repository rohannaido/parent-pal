import bcrypt from "bcrypt";
import { SignJWT, importJWK, JWTPayload } from "jose";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@parent-pal/database";

const generateJWT = async (payload: JWTPayload) => {
    const secret = process.env.JWT_SECRET || "secret";

    const jwk = await importJWK({ k: secret, alg: "HS256", kty: "oct" });

    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("365d")
        .sign(jwk);

    return jwt;
};

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize: async (credentials: Record<"email" | "password", string> | undefined) => {
                const { email, password } = credentials ?? {};
                if (!email || !password) return null;

                const user = await db.user.findUnique({ where: { email } });
                if (!user) return null;
                if (!user.password) return null;

                const hashedPassword = await bcrypt.compare(password, user.password);
                if (!hashedPassword) return null;

                const token = await generateJWT({ id: user.id });

                const updatedUser = await db.user.update({ where: { id: user.id }, data: { token } });

                return updatedUser;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: async ({ session, token }: { session: any; token: any }) => {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
        jwt: async ({ token, user }: { token: any; user: any }) => {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
    },
}