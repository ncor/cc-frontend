import seedColor from 'seed-color';
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/lib/models/tag/types";


export interface TagBadgeProps {
    reference: Tag
}

export default function TagBadge({
    reference
}: TagBadgeProps) {
    const colorRgb = seedColor(reference.name).toRGB();
    const colorString = `rgb(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b})`;
    const colorMutedString = `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, 0.2)`;

    return <div
        style={{
            color: colorString,
            backgroundColor: colorMutedString
        }}
        className="inline-flex items-center rounded-[8px] px-2 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
        { reference.name }
    </div>;
}
