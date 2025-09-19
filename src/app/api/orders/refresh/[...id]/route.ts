import {withDatabase} from "@/lib/withDatabase";
import {NextRequest, NextResponse} from "next/server";
import Razorpay from "razorpay";
import Order, {OrderStatus} from "@/models/Order";

type handlerParams = {
    params: Promise<{ id: string }>
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET_SECRET!,
})

async function handler(_req: NextRequest, {params}: handlerParams) {
    try {
        const {id} = (await params);
        if (!id) return NextResponse.json({error: "No such id"}, {
            status: 400
        });


        const pays = (await razorpay.orders.fetchPayments(id.toString())).items

        const payObj = pays.reduce((newest, current) => current.created_at > newest.created_at ? current : newest)
        pays.reduce((a, b) => b.created_at > a.created_at ? a : b)

        if (!payObj) {
            return NextResponse.json({error: "No such id"}, {status: 400})
        }

        if (payObj.status === "captured") {
            try {
                await Order.findOneAndUpdate({
                    razorpayOrderId: id.toString(),
                }, {
                    razorpayPaymentId: payObj.id,
                    status: OrderStatus.COMPLETED
                })
                    .populate([
                        {path: "productId", select: "name", model: "Product"},
                        {path: "userId", select: "email", model: "User"}
                    ])

            } catch (e) {
                console.error("Populate Error: ", e);
                await Order.findOneAndUpdate(
                    {razorpayOrderId: id.toString()},
                    {razorpayPaymentId: payObj.id, status: OrderStatus.COMPLETED}
                )
            }
        }
        if (payObj.status === "failed") {
            try {
                await Order.findOneAndUpdate({
                    razorpayOrderId: id.toString(),
                }, {
                    razorpayPaymentId: payObj.id,
                    status: OrderStatus.FAILED
                })
                    .populate([
                        {path: "productId", select: "name", model: "Product"},
                        {path: "userId", select: "email", model: "User"}
                    ])

            } catch (e) {
                console.error("Populate Error: ", e);
                await Order.findOneAndUpdate(
                    {razorpayOrderId: id.toString()},
                    {razorpayPaymentId: payObj.id, status: OrderStatus.COMPLETED}
                )
            }
        }

        return NextResponse.json({message: "Refreshed successfully!", success: true, pays}, {status: 200});
    } catch (e: any) {
        console.error("Error fetching order", e);
        return NextResponse.json({
            code: e.statusCode,
            error: e.error || "Failed to refresh ",
            success: false
        }, {status: e.statusCode});
    }
}

export const GET = await withDatabase(handler);