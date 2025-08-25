"use client";
import React, {useState} from 'react'
import {useForm} from "react-hook-form"
import {VerifySchema, VerifyType} from "@/Schema/Verify";
import {zodResolver} from "@hookform/resolvers/zod"

type MessageType = 'success' | 'error';

interface Message {
    text: string;
    type: MessageType;
}

const InputForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<Message | null>(null);
    const {
        handleSubmit,
        register,
        formState: {errors, isValid}
    } = useForm<VerifyType>({
        mode: "onChange",
        resolver: zodResolver(VerifySchema),
        defaultValues: {
            email: ""
        }
    })
    const onSubmit = async (data: VerifyType) => {
        setIsLoading(true);
        setMessage(null);
        try {
            const base_url = window.location.origin;
            const res = await fetch(`${base_url}/api/auth/request-verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: data.email})
            })
            const result = await res.json();
            console.log("API Response:", {status: res.status, body: result});
            if (!result.success) {
                setMessage({text: result.error || "Failed to send verification link.", type: "error"})
            } else
                setMessage({text: result.message, type: "success"});
        } catch (e) {
            console.log("Error requesting Verification: ", e);
            setMessage({text: e.message, type: "error"});
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            className="flex flex-col p-4 my-4 justify-center items-center space-y-4 w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full">
                <input
                    className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    disabled={isLoading}
                />
                {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </span>
                )}
            </div>
            <button
                className="w-full bg-blue-600 text-white font-bold rounded-md py-3 px-4 hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading || !isValid}
            >
                {isLoading ? "Sending..." : "Request New Link"}
            </button>

            {message && (
                <div className={`text-sm font-medium p-3 rounded-md w-full text-center ${
                    message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                    {message.text}
                </div>
            )}
        </form>
    )
}
export default InputForm
