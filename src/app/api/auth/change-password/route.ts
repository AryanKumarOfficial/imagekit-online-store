// /auth/change-password

import {NextRequest, NextResponse} from "next/server";
import User, {changePassword} from "@/models/User";

export async function PUT(request: NextRequest) {
    const {email, password, newPassword} = await request.json();
    if (!email || !password || !newPassword) {
        return NextResponse.json({message: "Email and pass", success: false}, {status: 404});
    }

    const result: changePassword = await User.changePassword(email, password, newPassword);
    if ((result.status === 200)) {
        return NextResponse.json({message: result.message, success: true, status: result.status});
    } else return NextResponse.json({message: result.message, success: false, status: result.status});
}