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

        const res = await razorpay.orders.fetch(id);
        // if (res.statusCode !== 200) {
        //     return NextResponse.json({
        //         error: res.error.description,
        //     })
        // }

        const pays = (await razorpay.payments.all()).items;
        const payObj = pays.filter((p) => p.order_id === id.toString());
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

        console.log(res);
        return NextResponse.json({res, pays}, {status: 200});
    } catch (e) {
        console.error("Error fetching order", e);
        return NextResponse.json({code: e.error.code, error: e.error.description}, {status: e.statusCode});
    }
}

export const GET = await withDatabase(handler);