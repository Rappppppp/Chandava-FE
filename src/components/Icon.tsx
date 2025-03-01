// components/Icon.tsx
import { icons } from "lucide-react";

interface IconProps {
  name: keyof typeof icons; // Ensures only valid Lucide icon names can be used
  color?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, color = "gray", size = 24 }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null; // If the icon name is invalid, return nothing
  }

  return <IconComponent size={size} color={color} />;
};

export default Icon;
