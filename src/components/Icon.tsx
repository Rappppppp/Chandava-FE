// components/Icon.tsx
import { icons } from "lucide-react";

interface IconProps {
  name: keyof typeof icons; // Ensures only valid Lucide icon names can be used
  color?: string;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, color, size = 24, className = "" }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null; // If the icon name is invalid, return nothing
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export default Icon;
