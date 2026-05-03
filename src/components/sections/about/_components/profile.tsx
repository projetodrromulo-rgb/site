import { forwardRef } from "react";
import Image from "next/image";

interface AboutProfileProps {
    src: string;
    alt: string;
    className?: string;
}

export const AboutProfile = forwardRef<HTMLDivElement, AboutProfileProps>(
    ({ src, alt, className }, ref) => {
        console.log("AboutProfile src:", src);
        return (
            <div ref={ref} className={`${className} relative w-full max-w-[480px] aspect-[3/4] rounded-2xl overflow-hidden`}>
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        );
    }
);

AboutProfile.displayName = "AboutProfile";
