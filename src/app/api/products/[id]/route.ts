import {NextRequest, NextResponse} from "next/server";
import {withDatabase} from "@/lib/withDatabase";
import Product from "@/models/Product";

async function handler(
    _request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await props.params;

        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json({
                error: 'Product not found',
            }, {
                status: 404
            })
        }

        return NextResponse.json({
            product
        }, {
            status: 200
        })

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "An error occurred while trying to retrieve the product",
        }, {
            status: 500
        });
    }
}

export const GET = await withDatabase(handler);