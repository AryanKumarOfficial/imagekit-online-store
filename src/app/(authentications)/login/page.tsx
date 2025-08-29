"use client";

import {signIn} from "next-auth/react";
import React, {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {NotificationTypes, useNotification} from "../../components/Notification";
import Link from "next/link";
import {Loader2} from "lucide-react";

export default function Login() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {showNotification} = useNotification();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: true,
                callbackUrl,
            });

            if (result?.error) {
                showNotification(result.error, "error");
            } else {
                showNotification("Login successful!", NotificationTypes.SUCCESS);
                router.push("/");
            }
        } catch (e) {
            console.log("error", e);
            showNotification("Failed to login", NotificationTypes.ERROR);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 relative"
                >
                    {loading && (
                        <Loader2 className="w-4 h-4 animate-spin absolute left-[40%] top-1/3"
                        />)
                    }
                    Login
                </button>
                <p className="text-center mt-4">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:text-blue-600">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}