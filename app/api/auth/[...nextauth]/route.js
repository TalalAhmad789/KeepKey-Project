import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import { handleDBConnection } from '@/app/Connection/ConnectionDB';
import User from '@/app/model/User';

const authOptions = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    scope: 'read:user user:email',
                },
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: 'read:user user:email',
                },
            }
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (!user.email) {
                    console.log("Email not provided by GitHub.");
                    return false; // GitHub sometimes doesn't return email
                }
                //DataBase Connection
                await handleDBConnection();
                const currentUser = await User.findOne({ email: user.email });
                if (!currentUser) {
                    const newUser = await User.create({
                        email: user.email,
                        username: user.email.split("@")[0],
                        name: user.name || user.email.split("@")[0],
                    })
                    await newUser.save();
                    return true;
                }
                else {
                    return true;
                }
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        async session({ session }) {
            const userDB = await User.findOne({ email: session.user.email });
            session.user.name = userDB.username;
            return session;
        }
    }
}
)

export { authOptions as GET, authOptions as POST }

