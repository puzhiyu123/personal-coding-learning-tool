interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-sand-800 rounded ${className}`}
    />
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-sand-900 rounded-xl p-6 border border-sand-800">
      <Skeleton className="h-6 w-1/3 mb-4" />
      <SkeletonText lines={2} />
    </div>
  );
}

export function SkeletonEditor() {
  return (
    <div className="h-full bg-sand-950 p-4">
      <div className="space-y-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-8 h-4" />
            <Skeleton className={`h-4 ${["w-full", "w-3/4", "w-1/2", "w-2/3"][i % 4]}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonSidebar() {
  return (
    <div className="p-4 space-y-4">
      <Skeleton className="h-8 w-full" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    </div>
  );
}
