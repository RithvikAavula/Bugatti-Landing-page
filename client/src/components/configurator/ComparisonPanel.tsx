import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  exteriorColors,
  brakeColors,
  wheelDesigns,
  carbonFiberPackages,
  interiorMaterials,
  stitchingColors,
} from "@shared/schema";

interface ComparisonPanelProps {
  configs: any[];
  onClose: () => void;
}

export function ComparisonPanel({ configs, onClose }: ComparisonPanelProps) {
  if (configs.length === 0) return null;

  const getLabel = (id: string, list: any[]) => {
    return list.find(item => item.id === id)?.name || id;
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold">
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Compare Configurations
            </span>
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-comparison"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configs.map((config, index) => (
            <Card key={index} className="p-6" data-testid={`comparison-card-${index}`}>
              <h3 className="text-xl font-display font-bold mb-4">{config.name}</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Exterior</div>
                  <div className="font-medium">{getLabel(config.exteriorColor, exteriorColors)}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground">Brakes</div>
                  <div className="font-medium">{getLabel(config.brakeColor, brakeColors)}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground">Wheels</div>
                  <div className="font-medium">{getLabel(config.wheelDesign, wheelDesigns)}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground">Carbon Fiber</div>
                  <div className="font-medium">{getLabel(config.carbonFiberPackage, carbonFiberPackages)}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground">Interior</div>
                  <div className="font-medium">{getLabel(config.interiorMaterial, interiorMaterials)}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground">Stitching</div>
                  <div className="font-medium">{getLabel(config.stitchingColor, stitchingColors)}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
