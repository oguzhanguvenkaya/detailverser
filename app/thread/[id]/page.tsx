import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function ThreadPage({ params }: PageProps) {
    const resolvedParams = await params;

    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6">
            <div className="mx-auto max-w-3xl">
                <Link
                    href="/"
                    className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-amber-600 transition-colors"
                >
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    Back to Feed
                </Link>
                <div className="rounded-3xl border border-stone-200/50 bg-white/70 p-8 shadow-sm backdrop-blur-xl md:p-12">
                    <div className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 mb-6">
                        Detailed Thread
                    </div>
                    <h1 className="text-3xl font-bold text-stone-900 mb-4 md:text-4xl">Viewing Thread: {resolvedParams.id}</h1>
                    <p className="text-stone-600 text-lg leading-relaxed">
                        This is a functional route placeholder to demonstrate that navigation is working. Real thread content, comments, and media would be loaded here.
                    </p>
                </div>
            </div>
        </div>
    );
}
