"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends Omit<ImageProps, "onLoad"> {
    containerClassName?: string;
}

export function BlurImage({
    className,
    containerClassName,
    alt,
    ...props
}: BlurImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cn("overflow-hidden", containerClassName)}>
            <Image
                className={cn(
                    "duration-700 ease-in-out",
                    isLoading
                        ? "scale-110 blur-lg grayscale"
                        : "scale-100 blur-0 grayscale-0",
                    className
                )}
                alt={alt}
                onLoad={() => setIsLoading(false)}
                {...props}
            />
        </div>
    );
}
