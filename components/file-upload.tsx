"use client";

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { X, FileIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: keyof OurFileRouter;
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {
    const fileType = value?.split(".").pop();

    if (value) {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded bg-slate-100/50">
                <div className="relative h-40 w-40 aspect-square overflow-hidden rounded">
                    <Image
                        fill
                        src={value}
                        alt="Upload"
                        className="object-cover"
                    />
                </div>
                <Button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                    variant="ghost"
                    size="icon"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        )
    }

    return (
        <UploadDropzone<OurFileRouter, typeof endpoint>
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
                toast.success("Image uploaded successfully");
            }}
            onUploadError={(error: Error) => {
                toast.error(`Upload failed: ${error.message}`);
            }}
            className="border-primary/20 bg-slate-50/50 ut-label:text-primary ut-button:bg-primary ut-button:ut-readying:bg-primary/50"
        />
    );
}
