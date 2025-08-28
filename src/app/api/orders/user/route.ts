export const dynamic = 'force-dynamic'

import {withDatabase} from "@/lib/withDatabase";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import Order from "@/models/Order";

async function handler() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                error: "Unauthorized",
            }, {
                status: 401
            })
        }

        const orders = await Order.find({userId: session.user.id})
            .populate({
                path: "productId",
                select: "name imageUrl",
                options: {strictPopulate: false}
            })
            .sort({createdAt: -1})
            .lean()

        return NextResponse.json({
            orders,
        }, {
            status: 200
        })

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "An error has occurred",
        }, {status: 500});
    }
}

export const GET = await withDatabase(handler);