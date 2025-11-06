import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import {
  exteriorColors,
  brakeColors,
  wheelDesigns,
  carbonFiberPackages,
  interiorMaterials,
  stitchingColors,
  emblemStyles,
} from "@shared/schema";

interface ConfigPanelProps {
  config: {
    name: string;
    exteriorColor: string;
    brakeColor: string;
    wheelDesign: string;
    carbonFiberPackage: string;
    interiorMaterial: string;
    stitchingColor: string;
    emblemStyle: string;
  };
  setConfig: (config: any) => void;
  galleryImages: { id: string; url: string; title: string }[];
  selectedImage: string | null;
  onSelectImage: (url: string) => void;
  ratings: Record<string, number>;
  onRateImage: (url: string, stars: number) => void;
}

export function ConfigPanel({ config, setConfig, galleryImages, selectedImage, onSelectImage, ratings, onRateImage }: ConfigPanelProps) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-display font-bold mb-6">
        <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
          Configure Your Bugatti
        </span>
      </h2>

      <div className="mb-6">
        <Label htmlFor="config-name">Configuration Name</Label>
        <Input
          id="config-name"
          value={config.name}
          onChange={(e) => setConfig({ ...config, name: e.target.value })}
          className="mt-2"
          data-testid="input-config-name"
        />
      </div>

      <Tabs defaultValue="exterior" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="exterior" data-testid="tab-exterior">Exterior</TabsTrigger>
          <TabsTrigger value="interior" data-testid="tab-interior">Interior</TabsTrigger>
          <TabsTrigger value="gallery" data-testid="tab-gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="exterior" className="space-y-6 mt-6">
          <div>
            <Label className="text-base mb-3 block">Emblem / Logo Style</Label>
            <div className="grid grid-cols-5 gap-3">
              {emblemStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setConfig({ ...config, emblemStyle: style.id })}
                  className={`relative aspect-square rounded-md border-2 transition-all hover-elevate overflow-hidden flex items-center justify-center bg-card/40 backdrop-blur-sm ${
                    config.emblemStyle === style.id
                      ? "border-primary shadow-lg shadow-primary/50"
                      : "border-border/50"
                  }`}
                  data-testid={`emblem-${style.id}`}
                  title={style.name}
                >
                  <img src={style.preview} alt={style.name} className="h-10 w-10" />
                </button>
              ))}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Selected: {emblemStyles.find(e => e.id === config.emblemStyle)?.name}
            </div>
          </div>

          <div>
            <Label className="text-base mb-3 block">Exterior Color</Label>
            <div className="grid grid-cols-4 gap-3">
              {exteriorColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setConfig({ ...config, exteriorColor: color.id })}
                  className={`relative aspect-square rounded-md border-2 transition-all hover-elevate ${
                    config.exteriorColor === color.id
                      ? "border-primary shadow-lg shadow-primary/50"
                      : "border-border/50"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  data-testid={`color-${color.id}`}
                >
                  {config.exteriorColor === color.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Selected: {exteriorColors.find(c => c.id === config.exteriorColor)?.name}
            </div>
          </div>

          <div>
            <Label className="text-base mb-3 block">Brake Caliper Color</Label>
            <div className="grid grid-cols-5 gap-3">
              {brakeColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setConfig({ ...config, brakeColor: color.id })}
                  className={`relative aspect-square rounded-md border-2 transition-all hover-elevate ${
                    config.brakeColor === color.id
                      ? "border-primary shadow-lg shadow-primary/50"
                      : "border-border/50"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  data-testid={`brake-${color.id}`}
                >
                  {config.brakeColor === color.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Selected: {brakeColors.find(c => c.id === config.brakeColor)?.name}
            </div>
          </div>

          <div>
            <Label htmlFor="wheel-design" className="text-base">Wheel Design</Label>
            <Select
              value={config.wheelDesign}
              onValueChange={(value) => setConfig({ ...config, wheelDesign: value })}
            >
              <SelectTrigger id="wheel-design" className="mt-2" data-testid="select-wheel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {wheelDesigns.map((wheel) => (
                  <SelectItem key={wheel.id} value={wheel.id}>
                    {wheel.name} {wheel.price > 0 && `(+$${wheel.price.toLocaleString()})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="carbon-package" className="text-base">Carbon Fiber Package</Label>
            <Select
              value={config.carbonFiberPackage}
              onValueChange={(value) => setConfig({ ...config, carbonFiberPackage: value })}
            >
              <SelectTrigger id="carbon-package" className="mt-2" data-testid="select-carbon">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {carbonFiberPackages.map((pkg) => (
                  <SelectItem key={pkg.id} value={pkg.id}>
                    {pkg.name} {pkg.price > 0 && `(+$${pkg.price.toLocaleString()})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {config.carbonFiberPackage !== "none" && (
              <div className="mt-3 flex flex-wrap gap-2">
                {carbonFiberPackages
                  .find(p => p.id === config.carbonFiberPackage)
                  ?.includes?.map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="interior" className="space-y-6 mt-6">
          <div>
            <Label className="text-base mb-3 block">Interior Material</Label>
            <div className="grid grid-cols-3 gap-3">
              {interiorMaterials.map((material) => (
                <button
                  key={material.id}
                  onClick={() => setConfig({ ...config, interiorMaterial: material.id })}
                  className={`relative aspect-square rounded-md border-2 transition-all hover-elevate flex flex-col items-center justify-center p-2 ${
                    config.interiorMaterial === material.id
                      ? "border-primary shadow-lg shadow-primary/50"
                      : "border-border/50"
                  }`}
                  style={{ backgroundColor: material.hex }}
                  data-testid={`interior-${material.id}`}
                >
                  <div className="text-xs text-white text-center font-medium drop-shadow-lg">
                    {material.name.split(' ')[1]}
                  </div>
                  {material.price > 0 && (
                    <div className="text-xs text-white/80 mt-1">
                      +${(material.price / 1000).toFixed(0)}k
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Selected: {interiorMaterials.find(m => m.id === config.interiorMaterial)?.name}
            </div>
          </div>

          <div>
            <Label className="text-base mb-3 block">Stitching Color</Label>
            <div className="grid grid-cols-6 gap-3">
              {stitchingColors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setConfig({ ...config, stitchingColor: color.id })}
                  className={`relative aspect-square rounded-md border-2 transition-all hover-elevate ${
                    config.stitchingColor === color.id
                      ? "border-primary shadow-lg shadow-primary/50"
                      : "border-border/50"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  data-testid={`stitching-${color.id}`}
                >
                  {config.stitchingColor === color.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full shadow-lg" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Selected: {stitchingColors.find(c => c.id === config.stitchingColor)?.name}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6 mt-6">
        <div>
          <Label className="text-base mb-3 block">Inspiration Gallery</Label>
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((img) => (
              <div key={img.id} className="group rounded-md overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm">
                <button
                  onClick={() => onSelectImage(img.url)}
                  className={`block w-full aspect-video overflow-hidden ${selectedImage === img.url ? "ring-2 ring-primary" : ""}`}
                  data-testid={`gallery-img-${img.id}`}
                  title="View in stage"
                >
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                </button>
                <div className="p-3 flex items-center justify-between gap-2">
                  <div className="text-sm text-muted-foreground truncate" title={img.title}>{img.title}</div>
                  <div className="flex items-center gap-1" data-testid={`rating-${img.id}`}>
                    {[1,2,3,4,5].map((n) => (
                      <button
                        key={n}
                        onClick={() => onRateImage(img.url, n)}
                        aria-label={`Rate ${n} stars`}
                        className="p-0.5"
                      >
                        <Star className={`h-4 w-4 ${ (ratings[img.url] || 0) >= n ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground" }`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Click any image to preview it in place of the 3D model. Use “View 3D” to return.
          </div>
        </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
