import { TopNavbar } from "@/components/layout/top-navbar";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { BottomTabNav } from "@/components/mobile/bottom-tab-nav";
import { ThreadCardSkeleton } from "@/components/feed/thread-card-skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen">
            <TopNavbar user={null} authEnabled={false} />

            <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 pt-5 pb-24 lg:grid-cols-[250px_minmax(0,1fr)_320px] lg:px-6 lg:pb-10">
                <LeftSidebar />

                <main className="relative z-10 flex min-w-0 flex-col gap-4 pb-24 lg:pb-2">
                    <h1 className="sr-only">Community Feed</h1>

                    <Card>
                        <CardContent className="flex items-center gap-3 p-4">
                            <Skeleton className="size-10 rounded-full" />
                            <Skeleton className="h-11 flex-1 rounded-full" />
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <ThreadCardSkeleton key={i} />
                        ))}
                    </div>
                </main>

                <RightSidebar />
            </div>

            <BottomTabNav />
        </div>
    );
}
