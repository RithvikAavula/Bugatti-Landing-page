import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/GlassCard";
import { Gauge, Zap, Trophy } from "lucide-react";
import { bugattiModels } from "@shared/schema";
import bugattiImage1 from "@assets/Gemini_Generated_Image_laxchglaxchglaxc_1762419987975.png";
import bugattiImage2 from "@assets/Gemini_Generated_Image_stolnsstolnsstol_1762419987976.png";
import bugattiImage3 from "@assets/Gemini_Generated_Image_p70p78p70p78p70p_1762419987976.png";

const modelImages = [bugattiImage1, bugattiImage2, bugattiImage3, bugattiImage1, bugattiImage2];

const modelSpecs = [
  { hp: 1578, speed: 420, acceleration: 2.4 },
  { hp: 1600, speed: 490, acceleration: 2.3 },
  { hp: 1500, speed: 350, acceleration: 2.2 },
  { hp: 1850, speed: 500, acceleration: 2.1 },
  { hp: 1500, speed: 380, acceleration: 2.3 },
];

export default function Models() {
  const [selectedModel, setSelectedModel] = useState(0);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              The Collection
            </span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-body">
            Each Bugatti represents the absolute pinnacle of automotive engineering and design excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            {bugattiModels.map((model, index) => (
              <GlassCard
                key={model.id}
                neonBorder={selectedModel === index}
                className={`cursor-pointer transition-all ${
                  selectedModel === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedModel(index)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold mb-1">{model.name}</h3>
                    <p className="text-2xl font-bold text-primary">
                      ${(model.basePrice / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  {selectedModel === index && (
                    <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="space-y-6">
            <div className="relative aspect-[16/10] rounded-md overflow-hidden border border-primary/20 shadow-2xl shadow-primary/20">
              <img
                src={modelImages[selectedModel]}
                alt={bugattiModels[selectedModel].name}
                className="w-full h-full object-cover"
                data-testid="img-model"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <GlassCard neonBorder>
                <div className="flex flex-col items-center text-center">
                  <Gauge className="h-8 w-8 text-primary mb-2" />
                  <div className="text-3xl font-display font-bold text-primary">
                    {modelSpecs[selectedModel].hp}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase">HP</div>
                </div>
              </GlassCard>

              <GlassCard neonBorder>
                <div className="flex flex-col items-center text-center">
                  <Zap className="h-8 w-8 text-cyan-400 mb-2" />
                  <div className="text-3xl font-display font-bold text-cyan-400">
                    {modelSpecs[selectedModel].acceleration}s
                  </div>
                  <div className="text-xs text-muted-foreground uppercase">0-100</div>
                </div>
              </GlassCard>

              <GlassCard neonBorder>
                <div className="flex flex-col items-center text-center">
                  <Trophy className="h-8 w-8 text-blue-400 mb-2" />
                  <div className="text-3xl font-display font-bold text-blue-400">
                    {modelSpecs[selectedModel].speed}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase">km/h</div>
                </div>
              </GlassCard>
            </div>

            <Link href="/configurator">
              <Button size="lg" className="w-full" data-testid="button-configure-model">
                Configure {bugattiModels[selectedModel].name}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
