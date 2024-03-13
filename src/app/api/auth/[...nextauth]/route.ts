import { ENVIRONMENT } from "@/configurations";
import { jwtDecode, JwtPayload } from "jwt-decode";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";

declare module "next-auth" {
  interface User {
    id?: string;
    token?: string;
    refreshToken?: string;
    email?: string;
    image?: string;
    name?: string;
    role?: string;
    iss?: string;
    sub?: string;
    aud?: string[] | string;
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
  }

  interface Session {
    user: User;
    expires: string;
  }

}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string;
    refreshToken?: string;
    iat?: string;
    exp?: string;
    jti?: string;
  }
}

interface Credentials {
  email: string;
  password: string;
  token: string;
  refreshToken: string;
}

interface CustomJWTPayload extends JwtPayload {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        const { token, refreshToken } =
          credentials as Credentials;
        const user: User = {
          token: token,
          refreshToken: refreshToken,
        };

        if (user) {
          // Any object returned will be saved in user property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) // giriş yapıldığında 1 kere user dolu geliyor
        return { ...token, token: user.token, refreshToken: user.refreshToken };
      return token;
    },
    async session({ session, token }): Promise<any> {
      session.user = token.token ? jwtDecode(token.token) : session.user;
      const exp: number | undefined = (jwtDecode(token.token ?? "") as CustomJWTPayload).exp;
      session.expires = new Date((exp ?? 0) * 1000).toISOString();
      session.user = { ...session.user, token: token.token, refreshToken: token.refreshToken };
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    signIn: async (message) => {

    },
    signOut: async (message) => {

    },
    createUser: async (message) => {

    },
    session: async (message) => {

    },
    updateUser: async (message) => {

    }
  },

};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
