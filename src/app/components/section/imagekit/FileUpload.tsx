"use client";
import {IKUpload} from "imagekitio-next"
import {IKUploadResponse} from "imagekitio-next/dist/types/components/IKUpload/props";
import {useState} from "react";

export default function FileUpload({onSuccessAction}: { onSuccessAction: (response: IKUploadResponse) => void }) {
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onError = (err: { message: string }) => {
        setError(err.message);
        setUploading(false);
    }

    const handleSuccess = (response: IKUploadResponse) => {
        setUploading(false);
        setError(null);
        onSuccessAction(response);
    }

    const handleStartUpload = () => {
        setUploading(true);
        setError(null);
    }
    return (
        <div className={"space-y-2 "}>
            <IKUpload
                fileName={"product-image.png"}
                onError={onError}
                onSuccess={handleSuccess}
                onUploadStart={handleStartUpload}
                validateFile={(file: File) => {
                    const validTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"]
                    if (!validTypes.includes(file.type)) {
                        setError("Invalid file Type")
                    }
                    if (file.size > 5 * 1024 * 1024) {
                        // 5 MB
                        setError("File Too Large")
                    }
                    return true;
                }}
            />

            {uploading && (
                <p className={"text-sm text-gray-500"}>
                    Uploading...
                </p>
            )}

            {error && (
                <p className={"text-sm text-red-500"}>
                    {error}
                </p>
            )}
        </div>
    )
}