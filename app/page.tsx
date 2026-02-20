import { BeforeAfterSlider } from "@/components/feed/before-after-slider";
import { CreatePostTrigger } from "@/components/feed/create-post-trigger";
import { ThreadCard } from "@/components/feed/thread-card";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { TopNavbar } from "@/components/layout/top-navbar";
import { BottomTabNav } from "@/components/mobile/bottom-tab-nav";
import { threads } from "@/lib/mock-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <TopNavbar />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 pt-5 pb-24 lg:grid-cols-[250px_minmax(0,1fr)_320px] lg:px-6 lg:pb-10">
        <LeftSidebar />

        <main className="relative z-10 flex min-w-0 flex-col gap-4 pb-24 lg:pb-2">
          <CreatePostTrigger />

          {threads.map((thread, index) => (
            <ThreadCard key={thread.id} thread={thread}>
              {index === 0 && thread.sliderMedia ? (
                <BeforeAfterSlider
                  beforeImageUrl={thread.sliderMedia.beforeImageUrl}
                  afterImageUrl={thread.sliderMedia.afterImageUrl}
                  beforeLabel={thread.sliderMedia.beforeLabel}
                  afterLabel={thread.sliderMedia.afterLabel}
                />
              ) : null}
            </ThreadCard>
          ))}
        </main>

        <RightSidebar />
      </div>

      <BottomTabNav />
    </div>
  );
}
