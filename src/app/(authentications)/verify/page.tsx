"use client";

import InputForm from "@/app/components/section/verify/InputForm";
import {LoadingUI} from "@/components";
import {useSearchParams} from 'next/navigation';
import {useCallback, useEffect, useState} from "react";
import Link from "next/link";

type VerificationStatus = 'verifying' | 'success' | 'expired' | 'invalid';

const VerifyPage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<VerificationStatus>("verifying");
    const [message, setMessage] = useState<string>("Verifying your account Identity...");

    const verifyToken = useCallback(async (verificationToken: string) => {
        try {
            const base_url = window.location.origin;
            const req = await fetch(`${base_url}/api/auth/verify/${verificationToken}`, {
                method: 'PUT',
            });
            const data = await req.json();

            if (req.ok) {
                setStatus("success");
                setMessage(data.message)
            } else {
                setMessage(data.message || "An Unknown Error Occurred");
                if (req.status === 410) {
                    setStatus("expired");
                } else {
                    setStatus("invalid");
                }
            }
        } catch (e) {
            console.error("Verification failed with error: ", e);
            setStatus("invalid");
            setMessage("Failed to verify. Please try again later.");
        }

    }, [])

    useEffect(() => {
        if (token) {
            (async () => {
                await verifyToken(token);
            })()
        }

    }, [token, verifyToken])
    // A component to hold the page content that will be displayed behind the overlay

    if (!token) {
        return (
            <div className={"flex flex-col justify-center items-center min-h-screen w-full text-3xl font-bold p-4"}>
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold mb-4">
                        Verification Token Not Found
                    </h1>
                    <p className="text-base font-normal text-gray-600 dark:text-gray-400 mb-8">
                        It seems you&apos;ve reached this page without a verification token. Please enter your email
                        below to
                        request a new verification link.
                    </p>
                    <InputForm/>
                </div>
            </div>
        )
    }
    const PageContent = () => (
        <div className="text-center p-8 max-w-lg">
            <h1 className="text-4xl font-bold mb-4">Account Verification</h1>
            <div className="mt-8 p-6 border rounded-lg text-left bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <h2 className="font-semibold mb-2 text-lg">Verification Status:</h2>
                <p className={`text-base font-medium ${
                    status === 'success' ? 'text-green-600 dark:text-green-400' :
                        status === 'verifying' ? 'text-gray-600 dark:text-gray-300' :
                            'text-red-600 dark:text-red-400'
                }`}>
                    {message}
                </p>
                {status === 'success' && (
                    <Link href="/login"
                          className="mt-4 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                        Proceed to Login
                    </Link>
                )}
                {(status === 'expired' || status === 'invalid') && (
                    <p className="text-sm mt-4">Please request a new verification link.</p>
                )}
            </div>
        </div>
    );
    return (
        <section className={"relative min-h-screen w-full flex justify-center items-center"}>
            <PageContent/>
            {status === 'verifying' && (
                <LoadingUI
                    variant={"overlay"}
                    size={"lg"}
                    message={message}
                />
            )}
        </section>
    )
}

export default VerifyPage;
