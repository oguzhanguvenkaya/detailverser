import { PenSquare } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CreatePostTrigger() {
  return (
    <Card className="border-zinc-800 bg-zinc-900/80">
      <CardContent className="flex items-center gap-3 p-4">
        <Avatar>
          <AvatarImage
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80"
            alt="Create post avatar"
          />
          <AvatarFallback>DV</AvatarFallback>
        </Avatar>
        <Button
          variant="secondary"
          className="h-11 flex-1 justify-start rounded-full border border-zinc-700 bg-zinc-950/80 px-4 text-zinc-400 hover:text-zinc-200"
        >
          <PenSquare className="size-4" />
          Create new post
        </Button>
      </CardContent>
    </Card>
  );
}
