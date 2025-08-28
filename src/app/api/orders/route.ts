export const dynamic = 'force-dynamic'
import Razorpay from "razorpay";
import {NextRequest, NextResponse} from "next/server";
import {withDatabase} from "@/lib/withDatabase";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import Order from "@/models/Order";


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET_SECRET!,
})

async function handler(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                error: "Unauthorized"
            }, {
                status: 401
            })
        }

        const body = await req.json();
        const {product_id, variant} = body;
        if (!product_id || !variant) {

            console.log("res", body)
            return NextResponse.json({
                error: "Missing Required Fields"
            }, {
                status: 400
            })
        }

        const orderOptions = {
            amount: variant.price * 100,
            currency: "INR",
            receipt: `receipt-${product_id}`,
            notes: {
                productId: product_id,
            }, // take it seriously for filter purpose
        }

        // create razorpay Order
        const order = await razorpay.orders.create(orderOptions);

        const newOrder = await Order.create({
            userId: session.user.id,
            productId: product_id,
            variant: variant,
            razorpayOrderId: order.id,
            amount: Math.round(variant.price),
            status: "pending",
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            dbOrderId: newOrder._id,
        }, {
            status: 201
        })

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            error: "An error occurred",
        }, {
            status: 500
        })

    }
}

export const POST = await withDatabase(handler);