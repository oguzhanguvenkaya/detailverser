import { Skeleton } from "@/components/ui/skeleton";

export function ThreadCardSkeleton() {
    return (
        <div className="flex gap-3 border-b border-zinc-200 p-4 transition-colors">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-3">
                {/* Header (Author & Status) */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1.5">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>

                {/* Content Body */}
                <div className="space-y-2 pt-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-6 pt-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-8 ml-auto" />
                </div>
            </div>
        </div>
    );
}
