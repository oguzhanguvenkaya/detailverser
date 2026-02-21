import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { TopNavbar } from "@/components/layout/top-navbar";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { BottomTabNav } from "@/components/mobile/bottom-tab-nav";
import { isAuthEnabled } from "@/lib/features/auth";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function ThreadPage({ params }: PageProps) {
    const resolvedParams = await params;
    const authEnabled = isAuthEnabled();

    return (
        <div className="min-h-screen">
            <TopNavbar user={null} authEnabled={authEnabled} />

            <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 px-4 pt-5 pb-24 lg:grid-cols-[250px_minmax(0,1fr)_320px] lg:px-6 lg:pb-10">
                <LeftSidebar />

                <main className="relative z-10 flex min-w-0 flex-col gap-4 pb-24 lg:pb-2">
                    <Link
                        href="/"
                        className="group inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-500 hover:text-cyan-600 transition-colors"
                    >
                        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                        Back to Feed
                    </Link>

                    <div className="rounded-2xl border border-white/80 bg-white/70 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-2xl md:p-10">
                        <div className="inline-flex rounded-full bg-cyan-50 border border-cyan-200/50 px-3 py-1 text-xs font-medium text-cyan-700 mb-4">
                            Detailed Thread
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-3 md:text-3xl">Viewing Thread: {resolvedParams.id}</h1>
                        <p className="text-slate-500 leading-relaxed">
                            This is a functional route placeholder to demonstrate that navigation is working. Real thread content, comments, and media would be loaded here.
                        </p>
                    </div>
                </main>

                <RightSidebar />
            </div>

            <BottomTabNav />
        </div>
    );
}
