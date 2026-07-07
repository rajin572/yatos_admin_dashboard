import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Container from "../ui/CustomUi/Container";

type GradientType = "linear" | "radial" | "conic";
type GradientDirection = "to-t" | "to-b" | "to-l" | "to-r" | "to-tl" | "to-tr" | "to-bl" | "to-br";

const directionMap: Record<GradientDirection, string> = {
    "to-t": "to top",
    "to-b": "to bottom",
    "to-l": "to left",
    "to-r": "to right",
    "to-tl": "to top left",
    "to-tr": "to top right",
    "to-bl": "to bottom left",
    "to-br": "to bottom right",
};

interface GradientCardProps {
    from: string;
    via?: string;
    to: string;
    type?: GradientType;
    direction?: GradientDirection; // named direction
    angle?: number;                // custom angle in deg (overrides direction)
    className?: string;
    bgClassName?: string;
    children?: ReactNode;
    withContainer?: boolean;
}

const buildGradient = (
    type: GradientType,
    from: string,
    to: string,
    via?: string,
    direction?: GradientDirection,
    angle?: number
): string => {
    const stops = via ? `${from}, ${via}, ${to}` : `${from}, ${to}`;

    switch (type) {
        case "radial":
            return `radial-gradient(circle at center, ${stops})`;
        case "conic": {
            const conicAngle = angle ?? 135;
            return `conic-gradient(from ${conicAngle}deg at center, ${stops})`;
        }
        case "linear":
        default: {
            // angle takes priority over direction
            const linearDir = angle !== undefined
                ? `${angle}deg`
                : direction
                    ? directionMap[direction]
                    : "135deg";
            return `linear-gradient(${linearDir}, ${stops})`;
        }
    }
};

const GradientCard = ({
    from,
    via,
    to,
    type = "linear",
    direction,
    angle,
    className,
    bgClassName,
    children,
    withContainer = true,
}: GradientCardProps) => {
    const gradientStyle = buildGradient(type, from, to, via, direction, angle);

    const BgBlur = (
        <div
            className={cn("absolute blur-[200px] h-full w-full rounded-4xl pointer-events-none", bgClassName)}
            style={{ background: gradientStyle }}
        />
    );

    if (!children) return <>{BgBlur}</>;

    if (withContainer) {
        return (
            <div className={cn("relative bg-transparent!", className)}>
                {BgBlur}
                <Container className="z-10 bg-transparent!">{children}</Container>
            </div >
        );
    }

    return (
        <div className={cn("relative bg-transparent!", className)}>
            {BgBlur}
            <div className="relative z-10 bg-transparent! w-full">{children}</div>
        </div>
    );
};

export default GradientCard;