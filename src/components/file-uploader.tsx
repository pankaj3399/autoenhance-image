import React from "react";
import Dropzone, { DropzoneProps } from "react-dropzone";

import DocumentUploadIcon from "@/components/icons/document-upload-icon";

interface FileUploaderProps extends Omit<DropzoneProps, "children"> {
    children?: React.ReactNode;
    containerClassName?: string;
}

function FileUploader({ children, containerClassName, ...props }: FileUploaderProps) {
    return (
        <Dropzone {...props}>
            {({ getRootProps, getInputProps }: any) => (
                <div {...getRootProps()} className={["flex flex-col items-center rounded-xl border-4 border-dashed border-cliq-200 bg-cliq-10 px-4 py-10", containerClassName].join(" ")}>
                    <input {...getInputProps()} />
                    {children ? (
                        children
                    ) : (
                        <>
                            <div className="rounded-full border border-grey-50 bg-white p-2">
                                <DocumentUploadIcon className="text-base text-cliq-600" />
                            </div>
                            <p className="mt-2 text-xs font-medium text-gray-500">
                                Drop your files here or <span className="cursor-pointer text-cliq-600 hover:underline">browse</span>
                            </p>
                        </>
                    )}
                </div>
            )}
        </Dropzone>
    );
}

export default FileUploader;
