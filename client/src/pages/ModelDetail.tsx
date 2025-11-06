import { useEffect, useMemo, useRef, useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MODELS, Model, Section, cloudinaryWithTransform } from "@/lib/models";
import { Scene3D } from "@/components/3d/Scene3D";
import { BugattiCar3D } from "@/components/3d/BugattiCar3D";

export default function ModelDetail() {
  const [, params] = useRoute("/gallery/:modelId");
  const modelId = params?.modelId || "";
  const model: Model | undefined = MODELS.find((m) => m.id === modelId);

  if (!model) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-2">Model not found</h1>
          <p className="text-muted-foreground mb-4">The car model you requested does not exist.</p>
          <Link href="/gallery">
            <Button>Back to Gallery</Button>
          </Link>
        </div>
      </div>
    );
  }

  type ViewMode = "gallery" | "spin" | "threeD";
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const hasInterior = (model.interior?.length ?? 0) > 0;
  const [section, setSection] = useState<Section>("exterior");
  const [exteriorId, setExteriorId] = useState<string>(model.defaultExteriorId);
  const [interiorId, setInteriorId] = useState<string>(model.defaultInteriorId || "");
  const [bgRemovedFailed, setBgRemovedFailed] = useState<Record<string, boolean>>({});

  const current = section === "exterior"
    ? model.exterior.find((v) => v.id === exteriorId)!
    : model.interior!.find((v) => v.id === interiorId)!;

  const stageUrl = (() => {
    if (section === "exterior") {
      if (!bgRemovedFailed[current.url]) {
        return cloudinaryWithTransform(current.url, "e_background_removal");
      }
    }
    return current.url;
  })();

  // 360° frames: choose an ordered set of exterior views to approximate a rotation
  const frameOrderByModel: Record<string, string[]> = {
    chiron: ["front", "front-left", "left", "rear-left", "rear", "rear-right"],
    divo: ["front-right", "rear-right", "rear", "rear-left"],
  };
  const spinFrames = useMemo(() => {
    const order = frameOrderByModel[model.id];
    const base = model.exterior.filter((v) => !["cover", "top", "grille"].includes(v.id));
    if (!order) return base;
    const map = new Map(base.map((v) => [v.id, v] as const));
    const ordered = order.map((id) => map.get(id)).filter(Boolean) as NonNullable<typeof base[number]>[];
    // Fallback to base if any frame missing
    return ordered.length >= 3 ? ordered : base;
  }, [model.id, model.exterior]);

  // Preload 360° frames (with background removal transform applied)
  useEffect(() => {
    if (viewMode !== "spin") return;
    const imgs = spinFrames.map((v) => {
      const img = new Image();
      img.src = bgRemovedFailed[v.url] ? v.url : cloudinaryWithTransform(v.url, "e_background_removal");
      return img;
    });
    return () => {
      // no-op, allow GC to reclaim
    };
  }, [viewMode, spinFrames, bgRemovedFailed]);

  // Spin interaction state
  const [frameIndex, setFrameIndex] = useState(0);
  const dragStartX = useRef(0);
  const dragStartIndex = useRef(0);
  const dragging = useRef(false);
  const spinRef = useRef<HTMLDivElement | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartIndex.current = frameIndex;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    const stepPx = 20; // pixels per frame
    const deltaFrames = Math.floor(deltaX / stepPx);
    const n = spinFrames.length || 1;
    const next = (dragStartIndex.current - deltaFrames) % n;
    setFrameIndex(((next % n) + n) % n);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (viewMode !== "spin") return;
    const n = spinFrames.length || 1;
    if (e.key === "ArrowLeft") setFrameIndex((i) => (i + 1) % n);
    if (e.key === "ArrowRight") setFrameIndex((i) => (i - 1 + n) % n);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl font-display font-bold">
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">{model.name}</span>
          </h1>
          <Link href="/gallery">
            <Button variant="outline" size="sm">Back</Button>
          </Link>
        </div>

        {/* View mode toggle */}
        <div className="mb-4">
          <div className="inline-flex bg-background/70 border border-border/50 rounded-md p-1 backdrop-blur-md shadow-md">
            <Button size="sm" variant={viewMode === "gallery" ? "default" : "ghost"} onClick={() => setViewMode("gallery")}>Gallery</Button>
            <Button size="sm" variant={viewMode === "spin" ? "default" : "ghost"} onClick={() => setViewMode("spin")}>360°</Button>
            <Button size="sm" variant={viewMode === "threeD" ? "default" : "ghost"} onClick={() => setViewMode("threeD")}>3D</Button>
          </div>
        </div>

        {/* Content area switches by mode */}
        {viewMode === "gallery" && (
          <div className="relative rounded-lg border border-card-border bg-card/40 backdrop-blur-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="w-full aspect-video flex items-center justify-center">
              <img
                src={stageUrl}
                alt={`${model.name} — ${current.label} view`}
                className="w-full h-full object-contain"
                onError={() => {
                  if (section === "exterior") {
                    setBgRemovedFailed((prev) => ({ ...prev, [current.url]: true }));
                  }
                }}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0">
              <div className="pointer-events-none h-24 bg-gradient-to-t from-black/60 to-black/0" />
              <div className="pointer-events-auto px-3 pb-3">
                <div className="flex flex-col gap-2">
                  {hasInterior && (
                    <div className="bg-background/70 border border-border/50 rounded-md p-1 backdrop-blur-md shadow-md inline-flex w-fit">
                      <Button size="sm" variant={section === "exterior" ? "default" : "ghost"} onClick={() => setSection("exterior")}>Exterior</Button>
                      <Button size="sm" variant={section === "interior" ? "default" : "ghost"} onClick={() => setSection("interior")}>Interior</Button>
                    </div>
                  )}

                  <div className="bg-background/70 border border-border/50 rounded-md p-2 backdrop-blur-md shadow-md max-w-full overflow-x-auto no-scrollbar">
                    <div className="flex gap-2 min-w-max">
                      {section === "exterior"
                        ? model.exterior.map((v) => (
                            <Button key={v.id} size="sm" variant={exteriorId === v.id ? "default" : "outline"} onClick={() => setExteriorId(v.id)}>
                              {v.label}
                            </Button>
                          ))
                        : (model.interior || []).map((v) => (
                            <Button key={v.id} size="sm" variant={interiorId === v.id ? "default" : "outline"} onClick={() => setInteriorId(v.id)}>
                              {v.label}
                            </Button>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "spin" && (
          <div
            ref={spinRef}
            className="relative rounded-lg border border-card-border bg-card/40 backdrop-blur-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)] select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={() => (dragging.current = false)}
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <div className="w-full aspect-video flex items-center justify-center">
              <img
                src={bgRemovedFailed[spinFrames[frameIndex]?.url]
                  ? spinFrames[frameIndex]?.url
                  : cloudinaryWithTransform(spinFrames[frameIndex]?.url || "", "e_background_removal")}
                alt={`${model.name} — 360° frame`}
                className="w-full h-full object-contain"
                onError={() => {
                  const url = spinFrames[frameIndex]?.url;
                  if (url) setBgRemovedFailed((prev) => ({ ...prev, [url]: true }));
                }}
              />
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-foreground/70 bg-background/60 px-2 py-1 rounded border border-border/40">Drag to rotate</div>
          </div>
        )}

        {viewMode === "threeD" && (
          <div className="rounded-lg border border-card-border bg-card/40 backdrop-blur-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)] h-[60vh] min-h-[400px]">
            <Scene3D>
              <BugattiCar3D exteriorColor="#0ea5e9" autoRotate scale={1.4} />
            </Scene3D>
          </div>
        )}
      </div>
    </div>
  );
}
