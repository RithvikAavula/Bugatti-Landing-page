import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MODELS, Model, cloudinaryWithTransform } from "@/lib/models";

function ModelCard({ model }: { model: Model }) {
  const cover = model.exterior.find((v) => v.id === model.defaultExteriorId) || model.exterior[0];
  const stageUrl = cloudinaryWithTransform(cover.url, "e_background_removal");

  return (
    <Link
      href={`/gallery/${model.id}`}
      className="group rounded-lg border border-card-border bg-card/40 backdrop-blur-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.25)] block"
    >
      <div className="px-4 pt-4">
        <h2 className="text-xl font-display font-semibold">
          <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">{model.name}</span>
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">Click to view details and explore interior/exterior.</p>
      </div>

      <div className="relative mt-3">
        <div className="w-full aspect-video flex items-center justify-center">
          <img
            src={stageUrl}
            alt={`${model.name} — cover view`}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </div>
        <div className="absolute bottom-3 right-3">
          <Button size="sm" className="pointer-events-none opacity-90">View model</Button>
        </div>
      </div>
    </Link>
  );
}

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-display font-bold">
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">Models</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Explore each model in its own card. Backgrounds are removed automatically for exterior shots.</p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {MODELS.map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
