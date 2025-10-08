import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[288px] w-full rounded-xl" />
          <div className="space-y-2 mx-2">
            <Skeleton className="h-4 w-[230px]" />
            <Skeleton className="h-4 w-[180px]" />
          </div >
          <Skeleton className="h-4 w-[150px] mx-2" />
          <div className=" border-b"></div>
           <Skeleton className="h-4 w-[150px] mb-1 mx-2"/>
      </div>
    </div>
  )
}
