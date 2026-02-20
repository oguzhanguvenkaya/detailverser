"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeImageUrl: string;
  afterImageUrl: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function BeforeAfterSlider({
  beforeImageUrl,
  afterImageUrl,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(clamp(initialPosition, 5, 95));
  const [isDragging, setIsDragging] = useState(false);

  const updateFromClientX = (clientX: number) => {
    const element = sliderRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(next, 5, 95));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    updateFromClientX(event.clientX);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-2">
      <div
        ref={sliderRef}
        className="relative h-56 overflow-hidden rounded-lg touch-none select-none sm:h-64"
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
      >
        <div className="absolute inset-0">
          <Image
            src={beforeImageUrl}
            alt="Before condition"
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="absolute inset-0">
            <Image
              src={afterImageUrl}
              alt="After condition"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="absolute top-3 left-3 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] text-white backdrop-blur-md">
          {beforeLabel}
        </div>
        <div className="absolute top-3 right-3 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] text-white backdrop-blur-md">
          {afterLabel}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-cyan-300/85"
          style={{ left: `${position}%` }}
        />

        <button
          type="button"
          aria-label="Adjust before and after comparison"
          onPointerDown={handlePointerDown}
          className={cn(
            "animate-wiggle absolute top-1/2 z-30 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-400 bg-white text-cyan-600 shadow-[0_0_22px_rgba(6,182,212,0.25)] transition hover:scale-105 active:scale-95",
            isDragging && "scale-105",
          )}
          style={{ left: `${position}%` }}
        >
          <ChevronsLeftRight className="size-4" />
        </button>
      </div>

      <input
        type="range"
        min={5}
        max={95}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="sr-only"
        aria-label="Before and after slider"
      />
    </div>
  );
}
