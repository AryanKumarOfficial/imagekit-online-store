import {NextRequest, NextResponse} from "next/server";
import {withDatabase} from "@/lib/withDatabase";
import crypto from "crypto";
import Order from "@/models/Order";
import {transporter} from "@/utils/mails/setup";

async function handler(request: NextRequest) {
    try {

        const body = await request.text();
        const signature = request.headers.get("x-razorpay-signature");

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest("hex")

        if (signature !== expectedSignature) {
            return NextResponse.json({
                error: "Invalid signature",
            }, {
                status: 400
            })
        }
        const event = JSON.parse(body);
        console.log("Events: ", event)
        if (event.event === "payment.captured") {
            const payment = event.payload.payment.entity;
            const order = await Order.findOneAndUpdate({
                razorpayOrderId: payment.order_id,
            }, {
                razorpayPaymentId: payment.id,
                status: "completed"
            })
                .populate([
                    {path: "productId", select: "name"},
                    {path: "userId", select: "email"}
                ])

            if (order) {
                await transporter.verify();
                await transporter.sendMail({
                    from: `Imagekit Responder<${process.env.GMAIL_USER}>`,
                    to: order.userId.email,
                    subject: "Oder Completed",
                    text: `Your order ${order.productId.name} has been successfully placed!`
                })
            }
        }

        if (event.event === "payment.failed") {
            const payment = event.payload.payment.entity;
            const order = await Order.findOneAndUpdate({
                razorpayOrderId: payment.order_id,
            }, {
                razorpayPaymentId: payment.id,
                status: "failed"
            })
                .populate([
                    {path: "productId", select: "name"},
                    {path: "userId", select: "email"}
                ])

            if (order) {
                await transporter.verify();
                await transporter.sendMail({
                    from: `Imagekit Responder<${process.env.GMAIL_USER}>`,
                    to: order.userId.email,
                    subject: "Oder Failed",
                    text: `Your order ${order.productId.name} has been failed!`
                })
            }
        }

        return NextResponse.json({
            message: "Success"
        }, {status: 200})

    } catch (e) {
        console.error(e)
        return NextResponse.json({
            error: "An error occurred"
        }, {
            status: 500
        })
    }
}

export const POST = await withDatabase(handler);