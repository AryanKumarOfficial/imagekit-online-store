import {NextRequest, NextResponse} from "next/server";
import User, {IUser} from "@/models/User";
import {sendConfirmationMail} from "@/utils/mails/methods/ConfirmationMail";
import {withDatabase} from "@/lib/withDatabase";

async function handler(request: NextRequest) {
    try {
        const {email} = await request.json();
        if (!email) {
            return NextResponse.json({error: "Email is required", success: false}, {status: 404});
        }

        const userExists: IUser | null = await User.findOne({email});
        if (!userExists) {
            return NextResponse.json({error: "User with this email does not exist", success: false}, {status: 409});
        }
        if (userExists.isVerified) {
            return NextResponse.json({
                    message: "User with this email is already verified",
                    success: false,
                },
                {
                    status: 200
                }
            )
        }
        await sendConfirmationMail(email);
        return NextResponse.json({
                message: "Link to verify your account with this email is send!",
                success: true,
            },
            {status: 200}
        )

    } catch (e: any) {
        console.log("Internal Server Error: ", e);
        return NextResponse.json({error: "Internal Server Error", success: false}, {status: 500});
    }
}

export const POST = await withDatabase(handler);