import Image from "next/image";

interface EmptyStateProps {
  text?: string;
  className?: string;
}

export default function EmptyState({
  text = "No data found",
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      {/* Dynamic Image Placement */}
      <div className="relative w-48 h-48 mb-4 opacity-75">
        <Image
          src="/apps/frontend/public/no-img.png" // Path relative to your public folder
          alt="No image available"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover" // Ensures the image crops nicely into its container
        />
      </div>

      {/* Fallback Text */}
      <p className="text-gray-500 text-lg font-medium">{text}</p>
    </div>
  );
}
