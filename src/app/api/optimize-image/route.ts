import crpyto from "crypto";
import AutoEnhance from "@autoenhance.ai/javascript";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const formData = await req.formData();

	const file = formData.get("file") as File;

	try {
		const autoEnhance = new AutoEnhance(process.env.AUTO_ENHANCE_API_KEY!);

		const { s3PutObjectUrl, imageId, ...properties } = await autoEnhance.ImagesApi.createImage({
			imageIn: {
				contentType: file.type,
				enhanceType: "property",
				imageName: crpyto.randomBytes(9).toString("hex"),
			},
		});
		console.log("Properties", properties);

		await fetch(s3PutObjectUrl, {
			method: "PUT",
			headers: {
				"Content-Type": file.type,
			},
			body: file,
		});

		return NextResponse.json({ success: true, message: "Optimized image", data: { image_id: imageId } });
	} catch (error: any) { 
		console.log(error.response || error);
		return NextResponse.json(
			{ 
				success: false, 
				message: "Failed to optimize image",
				error: error?.response?.message || error?.response?.statusText || error.message || "Not Parsable Error"
			}, 
			{ status: 500 }
		);
	}

}
