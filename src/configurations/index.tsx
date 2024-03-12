const env = {
    API_URL: process.env.NEXT_PUBLIC_PRO_MODE,
    CLIENT_SECRET: process.env.NEXT_AUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

export const ENVIRONMENT = { ...env };
