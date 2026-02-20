import { TopNavbar } from "@/components/layout/top-navbar";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { BottomTabNav } from "@/components/mobile/bottom-tab-nav";
import { ThreadCardSkeleton } from "@/components/feed/thread-card-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900">
            <TopNavbar user={null} authEnabled={false} />

            <main className="mx-auto flex w-full max-w-7xl justify-center gap-6 px-4 pt-6 sm:px-6 lg:px-8">
                <LeftSidebar />

                <div className="flex w-full max-w-2xl flex-col gap-6 lg:w-[600px] pb-24 lg:pb-8">
                    {/* Create Post Skeleton */}
                    <Card className="border-zinc-200 bg-white shadow-sm">
                        <CardContent className="flex items-center gap-3 p-4">
                            <Skeleton className="size-10 rounded-full" />
                            <Skeleton className="h-11 flex-1 rounded-full" />
                        </CardContent>
                    </Card>

                    {/* Feed Title Skeleton */}
                    <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-zinc-200 bg-white px-4 py-3">
                        <h1 className="text-lg font-bold">Community Feed</h1>
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                    </div>

                    <div className="flex flex-col rounded-b-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <ThreadCardSkeleton key={i} />
                        ))}
                    </div>
                </div>

                <RightSidebar />
            </main>

            <BottomTabNav />
        </div>
    );
}
