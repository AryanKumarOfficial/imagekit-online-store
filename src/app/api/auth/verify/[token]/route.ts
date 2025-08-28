// /verify/123456 --> token
import {NextRequest, NextResponse} from "next/server";
import VerificationToken, {VerificationResult} from "@/models/VerificationToken";
import {withDatabase} from "@/lib/withDatabase";

type Params = Promise<{ token: string }>

interface RouteContext {
    params: Params
}

async function handler(_request: NextRequest, {params}: RouteContext) {
    try {
        const {token} = await params;
        if (!token) {
            return NextResponse.json({message: "Token not provided", success: false}, {status: 400});
        }

        const result: VerificationResult = await VerificationToken.verify(token);
        if (!result.success) {
            if (result.reason === "expired")
                return NextResponse.json({
                    message: "This verification link has been expired",
                    success: false
                }, {status: 410})
            return NextResponse.json({message: "Invalid verification link", success: false}, {status: 400})
        }
        return NextResponse.json(
            {message: "User Verified Successfully", success: true},
            {status: 200}
        );

    } catch (e: any) {
        return NextResponse.json({
            message: `Error Verifying Account.`,
            error: e,
            success: false
        }, {status: 500});
    }

}

export const PUT = await withDatabase(handler);