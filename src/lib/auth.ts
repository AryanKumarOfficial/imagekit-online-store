import {NextAuthOptions} from "next-auth";

import credentialProvider from "next-auth/providers/credentials";
import {connectToDatabase} from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

/**
 * Authentication configuration options for NextAuth.js.
 *
 * This object configures a credential-based authentication system that allows
 * users to sign in using an email and password combination.
 *
 * The authentication flow:
 * 1. User submits email and password credentials
 * 2. The System connects to the database
 * 3. System searches for a user with the provided email
 * 4. If found, compares the provided password with the stored hash using bcrypt
 * 5. On successful authentication, returns a user object with id, email, and role
 *
 * @throws {Error} "Invalid credentials" - When email/password are missing or invalid
 * @throws {Error} "No user found with this email" - When email doesn't match any user
 * @throws {Error} "Invalid password" - When password doesn't match the stored hash
 *
 * @type {NextAuthOptions}
 */
export const authOptions: NextAuthOptions = {
    providers: [
        credentialProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password",
                },
            },
            /**
             * Verify the user credentials and return the user profile.
             * @throws {Error} if the credentials are invalid
             * @returns {Promise<{ id: string, email: string, role: string }>} the user profile
             */
            async authorize(credentials): Promise<{ id: string; email: string; role: string; }> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                const email = credentials.email.trim();
                const password = credentials.password;

                try {
                    await connectToDatabase();
                    const user = await User.findOne({email});
                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    let isValid = await bcrypt.compare(
                        password,
                        user.password
                    );

                    // Handle legacy plaintext passwords by checking direct equality
                    // and migrating to hashed password if matched
                    if (!isValid && user.password === password) {
                        console.log(`Migrating plaintext password for user: ${email}`);
                        user.password = password; // Trigger pre-save hook to hash
                        await user.save();
                        isValid = true;
                    }

                    if (!isValid) {
                        throw new Error("Invalid password");
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Auth Error: ", error);
                    throw new Error("Invalid credentials");
                }
            },
        }),
    ],
    callbacks: {
        /**
         * Called when a session is created or updated.
         * @param {Object} session - The session object.
         * @param token
         * @returns {Promise<Object>} The session object with the user's id and role.
         */
        async session({session, token}) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            return session;
        },

        /**
         * Updates the JWT token with user information.
         *
         * This function is called whenever a JSON Web Token (JWT) is created or updated.
         * It populates the token with the user's id and role if the user object is provided.
         *
         * @param {Object} token - The token object which will be sent to the client.
         * @param {Object} user - The user object containing the user's id and role.
         * @returns {Promise<Object>} The updated token object.
         */

        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
    },
    pages: {
        signIn: "/login",
        error: "/error",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
        generateSessionToken() {
            return new Promise((resolve, reject) => {
                const token = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
                if (!token) {
                    reject(new Error("Failed to generate session token"));
                    return;
                }
                resolve(token);
            });
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "#000000", // Hex color code
        logo: "/logo.png", // Absolute URL to image
        buttonText: "#afdff1"
    },
};
