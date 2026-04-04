import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizes = {
    sm: { width: 120, height: 40 },
    md: { width: 150, height: 50 },
    lg: { width: 180, height: 60 },
  };

  const { width, height } = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo/fasonbul-logo.png"
        alt="FasonBul - Fason Üretimin Adresi"
        width={width}
        height={height}
        className="h-auto w-auto object-contain"
        priority
        style={{ maxHeight: height, maxWidth: width }}
      />
    </div>
  );
}
