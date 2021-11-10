import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
    session: {
        jwt: true
    },  
  providers: [
    // OAuth authentication provides
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // Sign in with passwordless email link
    Providers.Email({
      server: process.env.MAIL_SERVER,
      from: "<no-reply@example.com>",
    }),
  ],
 pages: {
       signIn: '/signin',
  },
  // SQL or MongoDB database (or leave empty)
  database: process.env.BASE_URL,
})