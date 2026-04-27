import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[260px,1fr]">
      <Skeleton className="h-[300px]" />
      <div className="space-y-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-[280px]" />
      </div>
    </div>
  );
}
