import {withDatabase} from "@/lib/withDatabase";
import {NextRequest, NextResponse} from "next/server";
import Product, {IProduct} from "@/models/Product";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

const handler = async () => {
    try {
        const products = await Product.find().lean();
        return NextResponse.json({
            products: products || [],
        }, {
            status: 200
        })
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            error: "An error occurred while fetching products",
        }, {
            status: 500
        })
    }
}

const postHandler = async (request: NextRequest) => {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({
                error: "Unauthorized",
            }, {
                status: 401
            })
        }
        const body: IProduct = await request.json();
        if (
            !body.name ||
            !body.description ||
            body.variants.length === 0 ||
            !body.imageUrl
        ) {
            return NextResponse.json({
                error: "All fields are required",
            }, {
                status: 400,
            })
        }
        const newProduct: IProduct = await Product.create(body);
        return NextResponse.json({
            newProduct,
        }, {
            status: 201
        })
    } catch (e) {
        console.log(e)
        return NextResponse.json({
            error: "An error occurred",
        }, {
            status: 500
        })
    }
}

export const GET = await withDatabase(handler);
export const POST = await withDatabase(postHandler);