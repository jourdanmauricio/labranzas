import NextAuth from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  // Configure one or more authentication providers
  debug: true,
  // logger: {
  //   error(code, metadata) {
  //     log.error(code, metadata);
  //   },
  //   warn(code) {
  //     log.warn(code);
  //   },
  //   debug(code, metadata) {
  //     log.debug(code, metadata);
  //   },
  // },
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    //   GoogleProvider({
    //     clientId: process.env.GOOGLE_ID,
    //     clientSecret: process.env.GOOGLE_SECRET,
    //   }),
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     username: {
    //       label: 'Username',
    //       type: 'text',
    //       placeholder: 'jsmith',
    //     },
    //     password: {
    //       label: 'Password',
    //       type: 'password',
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     const res = await fetch(
    //       `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/signin`,
    //       {
    //         method: 'POST',
    //         body: JSON.stringify(credentials),
    //         headers: { 'Content-type': 'application/json' },
    //       }
    //     );
    //     const user = await res.json();
    //     console.log('User', user);
    //     if (res.ok && user) {
    //       console.log('USER', user);
    //       return user;
    //     }
    //     console.log('NULL');
    //     return null;
    //   },
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log(
          'NEXTAUTH_URL',
          `${process.env.NEXTAUTH_URL}/api/auth/login`,
          credentials
        );
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/register',
  },
  // secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
