import AutoEnhance from "@autoenhance.ai/javascript";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { image_id, use_premium = false } = await req.json();

    try {
        const autoEnhance = new AutoEnhance(process.env.AUTO_ENHANCE_API_KEY!);

        let imageUrl: string;
        if (use_premium) {
            imageUrl = await autoEnhance.ImagesApi.downloadEnhancedImageRaw({
                id: image_id,
                size: "large",
            }).then((res) => res.raw.url);
        } else {
            imageUrl = await autoEnhance.ImagesApi.downloadWatermarkImageRaw({
                id: image_id,
            }).then((res) => res.raw.url);
        }

        return NextResponse.json({ success: true, message: "Downloaded image", data: { image_url: imageUrl } });
    } catch (error: any) {
        console.log(error.response || error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to download image",
                error: error?.response?.message || error?.response?.statusText || error.message || "Not Parsable Error",
            },
            { status: 500 }
        );
    }
}