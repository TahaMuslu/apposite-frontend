import { jwtDecode, JwtPayload } from "jwt-decode";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    id?: string;
    token: string;
    refreshToken: string;
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
          id: jwtDecode<CustomJWTPayload>(token).id,
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
    // signOut: "/logout",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = jwtDecode(token.token as string);
      const exp = jwtDecode(token.token as string).exp ?? 0;
      session.expires = new Date(exp * 1000).toISOString();
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      return url;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
