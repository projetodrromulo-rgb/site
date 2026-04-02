import { HeroContent } from "../types";

interface DescriptionProps {
    description: HeroContent['description'];
}

export function Description({ description }: DescriptionProps) {
    return (
        <p className="text-slate-300 text-[clamp(1rem,1.2vw,1.25rem)] font-medium leading-relaxed mb-6 lg:mb-8 max-w-[95%] xl:max-w-[80%] drop-shadow-md mx-auto">
            {description}
        </p>
    )
}