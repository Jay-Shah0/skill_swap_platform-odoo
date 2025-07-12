// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				await connectDB();
				const user = await User.findOne({ email: credentials?.email });

				if (!user) return null;

				const isValid = await bcrypt.compare(
					credentials!.password,
					user.password
				);
				if (!isValid) return null;

				return { id: user._id.toString(), email: user.email, name: user.name };
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id ?? "";
				token.email = user.email ?? "";
				token.name = user.name ?? "";
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user = {
					id: token.id as string,
					email: token.email as string,
					name: token.name as string,
				};
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
});

export { handler as GET, handler as POST };
