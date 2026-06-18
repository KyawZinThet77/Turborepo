import { Skeleton } from "@/components/ui/skeleton";

export default function CommentSkeleton() {
  return (
    <div className="relative space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between border-b pb-4">
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Comment skeletons */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            {/* Author row */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            {/* Content */}
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}