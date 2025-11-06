import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Scene3D } from "@/components/3d/Scene3D";
import { BugattiCar3D } from "@/components/3d/BugattiCar3D";
import { GlassCard } from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  exteriorColors,
  brakeColors,
  wheelDesigns,
  carbonFiberPackages,
  interiorMaterials,
  stitchingColors,
} from "@shared/schema";

export default function SharedConfig() {
  const [, params] = useRoute("/shared/:id");
  const configId = params?.id;

  const { data: configuration, isLoading, error } = useQuery({
    queryKey: [`/api/configurations/${configId}`],
    enabled: !!configId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-display text-primary mb-4 animate-pulse-glow">
            Loading Configuration...
          </div>
        </div>
      </div>
    );
  }

  if (!configuration) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <GlassCard className="max-w-md text-center p-8">
          <h1 className="text-2xl font-display font-bold mb-4">Configuration Not Found</h1>
          <p className="text-foreground/70 mb-6">
            This configuration may have been deleted or the link is invalid.
          </p>
          <Link href="/configurator">
            <Button>Create Your Own</Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  const selectedColor = exteriorColors.find(c => c.id === configuration.exteriorColor)?.hex || "#0ea5e9";
  const exteriorColorName = exteriorColors.find(c => c.id === configuration.exteriorColor)?.name || configuration.exteriorColor;
  const brakeColorName = brakeColors.find(c => c.id === configuration.brakeColor)?.name || configuration.brakeColor;
  const wheelName = wheelDesigns.find(w => w.id === configuration.wheelDesign)?.name || configuration.wheelDesign;
  const carbonName = carbonFiberPackages.find(c => c.id === configuration.carbonFiberPackage)?.name || configuration.carbonFiberPackage;
  const interiorName = interiorMaterials.find(i => i.id === configuration.interiorMaterial)?.name || configuration.interiorMaterial;
  const stitchingName = stitchingColors.find(s => s.id === configuration.stitchingColor)?.name || configuration.stitchingColor;

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              {configuration.name}
            </span>
          </h1>
          <p className="text-xl text-foreground/70 font-body">
            Custom Bugatti Configuration
          </p>
          <div className="mt-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              ${configuration.price.toLocaleString()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="aspect-[4/3] rounded-md overflow-hidden border border-primary/20">
            <Scene3D>
              <BugattiCar3D 
                exteriorColor={selectedColor}
                autoRotate
                scale={1.5}
              />
            </Scene3D>
          </div>

          <div className="space-y-6">
            <GlassCard neonBorder>
              <h2 className="text-2xl font-display font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  Configuration Details
                </span>
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Exterior Color</span>
                  <span className="font-medium">{exteriorColorName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Brake Calipers</span>
                  <span className="font-medium">{brakeColorName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Wheels</span>
                  <span className="font-medium">{wheelName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Carbon Fiber</span>
                  <span className="font-medium">{carbonName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Interior Material</span>
                  <span className="font-medium">{interiorName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-foreground/70">Stitching Color</span>
                  <span className="font-medium">{stitchingName}</span>
                </div>
              </div>
            </GlassCard>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/configurator" className="flex-1">
                <Button size="lg" className="w-full">
                  Create Your Own
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  Contact Us
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
