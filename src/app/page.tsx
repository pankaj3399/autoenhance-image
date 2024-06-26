"use client";

import React from "react";
import Image from "next/image";

import { Progress } from "@/components/ui/progress";
import CopyIcon from "@/components/icons/copy-icon";
import CodeIcon from "@/components/icons/code-icon";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import FileUploader from "@/components/file-uploader";
import DocumentUploadIcon from "@/components/icons/document-upload-icon";

export default function Home() {
	const { toast } = useToast();

	const [file, setFile] = React.useState<File | null>(null);
	const [usePremium, setUsePremium] = React.useState(false);
	const [uploadedImageId, setUploadedImageId] = React.useState<string | null>(null);

	const [isButtonsDisabled, setIsButtonsDisabled] = React.useState(false);

	const [showSpinner, setShowSpinner] = React.useState(false);

	const [progress, setProgress] = React.useState(0);
	const [useProgress, setUseProgress] = React.useState(false);
	const [showProgress, setShowProgress] = React.useState(false);

	React.useEffect(() => {
		if (!useProgress) return;

		setShowProgress(true);
		const timeouts: any[] = [];

		const updateProgress = (newProgress: number, delay: number) => {
			const timeout = setTimeout(() => setProgress(newProgress), delay);
			timeouts.push(timeout);
		};

		updateProgress(20, 500);
		updateProgress(45, 1000);
		updateProgress(70, 1800);
		updateProgress(85, 2800);
		updateProgress(100, 3500);

		const hideProgressTimeout = setTimeout(() => {
			setProgress(100); // Ensure progress is 100% before hiding
			setShowProgress(false);
			setUseProgress(false);
		}, 4000);

		timeouts.push(hideProgressTimeout);

		return () => timeouts.forEach(clearTimeout); // Clear timeouts on component unmount
	}, [useProgress]);

	const optimizeImage = async () => {
		setShowSpinner(true);
		setIsButtonsDisabled(true);

		if (file === null) {
			toast({ title: "No file selected", description: "Please select a file to optimize", variant: "destructive" });
		} else {
			const formData = new FormData();
			formData.append('file', file);

			const result = await fetch('/api/optimize-image', {
				method: 'POST',
				body: formData,
			});
			const data = await result.json();

			if (!result.ok || !data.success) {
				toast({ title: "Failed to optimize image", description: data.message, variant: "destructive" });
			} else {
				setFile(null);
				setUploadedImageId(data.data.image_id);
				toast({ title: "Image Optimization Request Sent Successful", description: "Wait a while before attempting to download the optimized image", variant: "default" });
			}
		}

		setShowSpinner(false);
		setUseProgress(true);

		setTimeout(() => {
			setIsButtonsDisabled(false);
		}, 4350);
	};

	const downloadImage = async () => {
		setIsButtonsDisabled(true);
		setShowSpinner(true);

		if (uploadedImageId === null) {
			toast({ title: "No image to download", description: "Please submit an image optimization request first", variant: "destructive" });
		} else {
			const result = await fetch('/api/download-optimized-image', {
				method: 'POST',
				body: JSON.stringify({ image_id: uploadedImageId, use_premium: usePremium }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await result.json();

			if (!result.ok || !data.success) {
				toast({ title: data.message, description: `${data.error} - (Note: Download sometimes takes a while to become available)`, variant: "destructive" });
			} else {
				window.open(data.data.image_url, '_blank');
			}
		}

		setShowSpinner(false);
		setIsButtonsDisabled(false);
	};

	return (
		<>
			<div className="flex justify-center items-center h-screen">
				<div className="w-full mx-10 md:mx-20">

					{showProgress && (
						<div className="mb-8">
							<Progress
								max={100}
								value={progress}
							/>
						</div>
					)}

					<FileUploader
						containerClassName="w-full text-center"
						accept={{
							"image/*": [".jpg", ".jpeg", ".png"],
						}}
						onDrop={(acceptedFiles) => {
							setUploadedImageId(null);
							setFile(acceptedFiles[0]);
						}}
						multiple={undefined} onDragEnter={undefined} onDragOver={undefined} onDragLeave={undefined}
					>
						{showSpinner ? (
							<div className="flex items-center justify-center">
								<div className="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-gray-800"></div>
							</div>
						) : (
							<>
								<div className="rounded-full border border-grey-50 bg-white p-2">{!file ? <DocumentUploadIcon className="text-7xl" /> : <Image src={URL.createObjectURL(file)} alt="logo" width={100} height={100} />}</div>
								<p className="mt-4 text-base font-bold text-gray-500">
									{file ? file.name.slice(0, 16) : "Drop your files here or"} <span className="cursor-pointer hover:underline">{file ? "selected" : "browse explorer"}</span>
								</p>
							</>
						)}
					</FileUploader>

					<div className="flex flex-col md:flex-row items-center justify-content-center mt-6 md:space-x-5 space-y-3 md:space-y-0">
						<button disabled={isButtonsDisabled} onClick={optimizeImage} className="bg-gray-800 disabled:bg-gray-300 text-white text-lg font-bold px-6 py-3 tracking-wider rounded-sm w-full">
							<CodeIcon className="text-3xl inline-block mr-2" />
							OPTIMIZE
						</button>

						<button disabled={isButtonsDisabled} onClick={downloadImage} className="bg-gray-800 disabled:bg-gray-300 text-white text-lg font-bold px-6 py-3 tracking-wider rounded-sm w-full">
							<CopyIcon className="text-3xl inline-block mr-2" />
							DOWNLOAD
						</button>
					</div>

					<div className="items-top flex space-x-2 mt-8">
						<Checkbox
							checked={usePremium}
							onCheckedChange={(checked: any) => setUsePremium(checked)}
							id="use_premium"
						/>
						<div className="grid gap-1.5 leading-none">
							<label
								htmlFor="use_premium"
								className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Download Image Without Watermark
							</label>
							<p className="text-sm text-muted-foreground">
								For this option, you will need to have a premium account (paid).
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
