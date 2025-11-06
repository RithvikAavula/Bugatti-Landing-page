import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Scene3D } from "@/components/3d/Scene3D";
import { BugattiCar3D } from "@/components/3d/BugattiCar3D";
import { ConfigPanel } from "@/components/configurator/ConfigPanel";
import { ShareModal } from "@/components/configurator/ShareModal";
import { ARPreviewModal } from "@/components/configurator/ARPreviewModal";
import { ComparisonPanel } from "@/components/configurator/ComparisonPanel";
import { Button } from "@/components/ui/button";
import { Share2, Eye, RotateCcw, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  exteriorColors,
  brakeColors,
  wheelDesigns,
  carbonFiberPackages,
  interiorMaterials,
  stitchingColors,
} from "@shared/schema";

export default function Configurator() {
  const { toast } = useToast();
  const [rotation, setRotation] = useState(0);
  const galleryImages = [
    {
      id: "img-1",
      url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762423531/flavien-LgruOWeSDLs-unsplash_cp5oss.jpg",
      title: "Flavien – Unsplash",
    },
    {
      id: "img-2",
      url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762423528/Gemini_Generated_Image_stolnsstolnsstol_dkbovs.png",
      title: "AI Render – Modern",
    },
    {
      id: "img-3",
      url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762423528/david-leveque-esvWH-owWug-unsplash_ioa1wc.jpg",
      title: "David Leveque – Unsplash",
    },
    {
      id: "img-4",
      url: "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762423527/Gemini_Generated_Image_p70p78p70p78p70p_jbd62i.png",
      title: "AI Render – Futuristic",
    },
  ];
  const [config, setConfig] = useState({
    name: "My Bugatti",
    exteriorColor: exteriorColors[1].id,
    brakeColor: brakeColors[0].id,
    wheelDesign: wheelDesigns[0].id,
    carbonFiberPackage: carbonFiberPackages[0].id,
    interiorMaterial: interiorMaterials[0].id,
    stitchingColor: stitchingColors[0].id,
    emblemStyle: "original",
  });
  const [viewerMode, setViewerMode] = useState<"3d" | "image">("3d");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [showARModal, setShowARModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState<typeof config[]>([]);
  const [savedConfiguration, setSavedConfiguration] = useState<any>(null);

  const saveConfigMutation = useMutation({
    mutationFn: async (configData: any) => {
      const res = await apiRequest("POST", "/api/configurations", configData);
      return await res.json();
    },
    onSuccess: (data) => {
      setSavedConfiguration(data);
      setSavedConfigs(prev => [...prev, { ...config }]);
      toast({
        title: "Configuration Saved",
        description: "Your Bugatti configuration has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const calculatePrice = () => {
    const basePrice = 3000000;
    const wheelPrice = wheelDesigns.find(w => w.id === config.wheelDesign)?.price || 0;
    const carbonPrice = carbonFiberPackages.find(c => c.id === config.carbonFiberPackage)?.price || 0;
    const interiorPrice = interiorMaterials.find(i => i.id === config.interiorMaterial)?.price || 0;
    return basePrice + wheelPrice + carbonPrice + interiorPrice;
  };

  const handleSaveConfig = () => {
    const price = calculatePrice();
    saveConfigMutation.mutate({
      ...config,
      price,
    });
  };

  const selectedColor = exteriorColors.find(c => c.id === config.exteriorColor)?.hex || "#0ea5e9";
  const emblemPreviewSrc = `/emblems/${config.emblemStyle}.svg`;

  const handleSelectImage = (url: string) => {
    setSelectedImage(url);
    setViewerMode("image");
  };

  const handleBackTo3D = () => setViewerMode("3d");

  const rateImage = (url: string, stars: number) => {
    setRatings(prev => ({ ...prev, [url]: stars }));
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-4rem)]">
        <div className="lg:col-span-2 relative">
          <div className="absolute inset-0">
            {viewerMode === "3d" ? (
              <Scene3D>
                <BugattiCar3D 
                  exteriorColor={selectedColor}
                  rotation={rotation}
                  autoRotate={false}
                  scale={1.5}
                />
              </Scene3D>
            ) : (
              <div className="w-full h-full bg-black/80 flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected configuration view"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : null}
              </div>
            )}
          </div>

          {/* Emblem preview overlay */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
            <img
              src={emblemPreviewSrc}
              alt={`${config.emblemStyle} emblem preview`}
              className="h-16 w-auto drop-shadow-[0_0_12px_rgba(14,165,233,0.35)]"
            />
          </div>

          {viewerMode === "3d" && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-10">
              <div className="bg-card/80 backdrop-blur-xl border border-card-border rounded-md p-2 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRotation(0)}
                  data-testid="button-view-front"
                >
                  Front
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRotation(Math.PI / 2)}
                  data-testid="button-view-side"
                >
                  Side
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRotation(Math.PI)}
                  data-testid="button-view-rear"
                >
                  Rear
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRotation(rotation + Math.PI / 8)}
                  data-testid="button-rotate"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="absolute top-8 right-8 flex flex-col gap-2 z-10">
            {viewerMode === "image" ? (
              <Button onClick={handleBackTo3D} variant="secondary" data-testid="button-back-3d">
                View 3D
              </Button>
            ) : null}
            <Button
              onClick={() => setShowARModal(true)}
              className="gap-2"
              data-testid="button-ar-preview"
            >
              <Eye className="h-4 w-4" />
              AR Preview
            </Button>
            <Button
              onClick={() => setShowShareModal(true)}
              variant="outline"
              className="gap-2"
              data-testid="button-share"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              onClick={handleSaveConfig}
              variant="outline"
              className="gap-2"
              disabled={saveConfigMutation.isPending}
              data-testid="button-save"
            >
              <Save className="h-4 w-4" />
              {saveConfigMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>

          <div className="absolute bottom-8 left-8 z-10">
            <div className="bg-card/80 backdrop-blur-xl border border-card-border rounded-md p-4">
              <div className="text-sm text-muted-foreground mb-1">Total Price</div>
              <div className="text-3xl font-display font-bold text-primary" data-testid="text-total-price">
                ${calculatePrice().toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="border-l border-border/30 overflow-y-auto bg-card/30 backdrop-blur-xl">
          <ConfigPanel 
            config={config} 
            setConfig={setConfig}
            galleryImages={galleryImages}
            selectedImage={selectedImage}
            onSelectImage={handleSelectImage}
            ratings={ratings}
            onRateImage={rateImage}
          />
        </div>
      </div>

      {showComparison && (
        <ComparisonPanel
          configs={savedConfigs}
          onClose={() => setShowComparison(false)}
        />
      )}

      <ShareModal
        open={showShareModal}
        onOpenChange={setShowShareModal}
        config={{ ...config, price: calculatePrice() }}
        savedConfiguration={savedConfiguration}
      />

      <ARPreviewModal
        open={showARModal}
        onOpenChange={setShowARModal}
        exteriorColor={selectedColor}
      />
    </div>
  );
}
