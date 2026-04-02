import { HeroContent } from "../types";
import { Ref } from "react";

interface BackgroundVideoProps {
    backgroundVideo: HeroContent['backgroundVideo'];
    mediaContainerRef: Ref<HTMLDivElement> | undefined;
    videoRef: Ref<HTMLVideoElement> | undefined;
    overlayRef: Ref<HTMLDivElement> | undefined;
    handleVideoEnded: () => void;
}

export function BackgroundVideo({ backgroundVideo, mediaContainerRef, videoRef, overlayRef, handleVideoEnded }: BackgroundVideoProps) {
    return (
        <div
            ref={mediaContainerRef}
            aria-hidden="true"
        >
            <video
                ref={videoRef}
                src={backgroundVideo.src}
                poster={backgroundVideo.poster}
                autoPlay
                muted
                loop={false}
                playsInline
                preload="auto"
                onEnded={handleVideoEnded}
                className="absolute inset-0 w-full h-full object-cover transform-gpu"
            />
            <div ref={overlayRef} className="absolute inset-0 bg-background/70"></div>
        </div>
    )
}