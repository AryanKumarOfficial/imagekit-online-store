import ImageKit from "imagekit";
import {NextResponse} from "next/server";
import {withDatabase} from "@/lib/withDatabase";

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

const handler = async () => {
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return NextResponse.json(authenticationParameters, {
            status: 200,
        });
    } catch (error) {
        console.error("Error generating authentication signature:", error);
        return NextResponse.json(
            {error: "Failed to generate authentication signature"},
            {status: 500}
        );
    }
}

export const GET = await withDatabase(handler);