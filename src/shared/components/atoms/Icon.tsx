import {
  Mail,
  MapPinMinus,
  MoonStar,
  Plane,
  Shield,
  SquarePen,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | string
  | "planet"
  | "map-pin-minus"
  | "moon-star"
  | "shield"
  | "mail"
  | "square-pen";

const iconMap: Record<IconName, LucideIcon> = {
  plane: Plane,
  "map-pin-minus": MapPinMinus,
  "moon-star": MoonStar,
  shield: Shield,
  mail: Mail,
  "square-pen": SquarePen,
};

interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  onClick?: () => void;
}

function Icon({ name, size = 21, className = "", onClick }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(
      `Icon "${name}" is not defined in iconMap. Check your name prop or iconMap.`
    );
    return null;
  }

  return <IconComponent size={size} className={className} onClick={onClick} />;
}

export default Icon;
