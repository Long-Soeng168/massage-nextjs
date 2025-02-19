import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard({ratio}) {
  return (
    <div className="flex flex-col w-full space-y-3">
      <Skeleton className={`w-full aspect-[${ratio}]`} />
      <div className="space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </div>
  )
}
