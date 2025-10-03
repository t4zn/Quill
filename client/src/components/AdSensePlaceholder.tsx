import { Card } from "@/components/ui/card";

interface AdSensePlaceholderProps {
  type?: "banner" | "square" | "sidebar";
  className?: string;
}

export default function AdSensePlaceholder({ type = "banner", className = "" }: AdSensePlaceholderProps) {
  const dimensions = {
    banner: "w-full h-24",
    square: "w-full aspect-square max-w-sm",
    sidebar: "w-full h-64"
  };

  return (
    <Card className={`${dimensions[type]} flex items-center justify-center bg-muted/30 border-dashed ${className}`}>
      <p className="text-sm text-muted-foreground">Ad Space</p>
    </Card>
  );
}
