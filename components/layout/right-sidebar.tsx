import { Sparkles } from "lucide-react";

import { trendingProducts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function RightSidebar() {
  return (
    <aside className="sticky top-20 z-40 hidden h-[calc(100vh-6rem)] overflow-y-auto space-y-4 lg:block">
      <Card className="border-cyan-500/35 bg-zinc-900/90 shadow-[0_0_38px_-20px_rgba(6,182,212,0.5)]">
        <CardContent className="space-y-4 p-4">
          <div className="space-y-1">
            <CardTitle className="text-sm tracking-wide text-zinc-100 uppercase">
              Detail Agent AI
            </CardTitle>
            <CardDescription>
              Ask for safe wash recipes, polish pairings, and coating maintenance plans.
            </CardDescription>
          </div>
          <div className="space-y-2">
            <Input
              aria-label="Ask Detail Agent"
              placeholder="How do I remove water spots safely?"
              className="h-10 border-cyan-500/30 bg-zinc-950"
            />
            <Button className="h-10 w-full justify-center rounded-lg">
              <Sparkles className="size-4" />
              Ask Detail Agent
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="space-y-1">
            <CardTitle className="text-sm tracking-wide text-zinc-100 uppercase">
              Trending Gear
            </CardTitle>
            <CardDescription>Price alerts from products watched by the community.</CardDescription>
          </div>

          <Separator />

          <ul className="space-y-3">
            {trendingProducts.map((product) => (
              <li key={product.id} className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                <p className="text-sm font-medium text-zinc-100">{product.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="mr-2 text-zinc-500 line-through">{product.oldPrice}</span>
                    <span className="font-semibold text-emerald-400">{product.newPrice}</span>
                  </div>
                  <Badge variant="success">{product.dropLabel}</Badge>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
}
