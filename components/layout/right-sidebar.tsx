"use client";

import { Sparkles } from "lucide-react";

import { trendingProducts } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function RightSidebar() {
  return (
    <aside
      aria-label="AI Agent and trending products"
      className="sticky top-20 z-40 hidden h-[calc(100vh-6rem)] overflow-y-auto space-y-4 lg:block"
    >
      <Card className="border-honey-primary/30 bg-honey-card shadow-sm backdrop-blur-md">
        <CardContent className="space-y-4 p-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold tracking-wide text-honey-card-text uppercase">
              Detail Agent AI
            </h2>
            <CardDescription>
              Ask for safe wash recipes, polish pairings, and coating maintenance plans.
            </CardDescription>
          </div>
          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Detail Agent AI will be implemented soon!");
            }}
          >
            <Input
              aria-label="Ask Detail Agent"
              placeholder="How do I remove water spots safely?"
              className="h-10 border-honey-primary/30 bg-honey-primary/10"
            />
            <Button type="submit" className="h-10 w-full justify-center rounded-lg active:scale-[0.98]">
              <Sparkles className="size-4" />
              Ask Detail Agent
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold tracking-wide text-honey-card-text uppercase">
              Trending Gear
            </h2>
            <CardDescription>Price alerts from products watched by the community.</CardDescription>
          </div>

          <Separator />

          <ul className="space-y-3">
            {trendingProducts.map((product) => (
              <li key={product.id} className="rounded-xl border border-honey-border bg-honey-card p-3">
                <p className="text-sm font-medium text-honey-card-text">{product.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">
                    <span className="mr-2 text-honey-text/50 line-through">{product.oldPrice}</span>
                    <span className="font-semibold text-emerald-600">{product.newPrice}</span>
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
