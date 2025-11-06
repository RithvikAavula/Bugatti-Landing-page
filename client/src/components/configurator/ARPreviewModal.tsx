import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Smartphone, QrCode } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ARPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exteriorColor: string;
}

export function ARPreviewModal({ open, onOpenChange, exteriorColor }: ARPreviewModalProps) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const handleARLaunch = () => {
    if (isMobile) {
      alert("AR Preview feature would be launched here using WebXR");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            AR Preview
          </DialogTitle>
          <DialogDescription>
            View your configured Bugatti in your space using augmented reality
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {isMobile ? (
            <>
              <Alert>
                <Smartphone className="h-4 w-4" />
                <AlertDescription>
                  AR Preview is available on your device. Tap the button below to view your Bugatti in your space.
                </AlertDescription>
              </Alert>

              <div className="aspect-video bg-gradient-to-br from-background via-card to-background rounded-md border border-primary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Eye className="h-16 w-16 text-primary mx-auto animate-pulse-glow" />
                  <p className="text-sm text-muted-foreground">
                    AR experience will launch here
                  </p>
                </div>
              </div>

              <Button
                onClick={handleARLaunch}
                className="w-full"
                size="lg"
                data-testid="button-launch-ar"
              >
                <Eye className="mr-2 h-5 w-5" />
                Launch AR Preview
              </Button>
            </>
          ) : (
            <>
              <Alert>
                <QrCode className="h-4 w-4" />
                <AlertDescription>
                  Scan this QR code with your phone to view AR preview on your mobile device.
                </AlertDescription>
              </Alert>

              <div className="aspect-square bg-gradient-to-br from-background via-card to-background rounded-md border border-primary/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <QrCode className="h-32 w-32 text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    QR Code for mobile AR preview
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                AR Preview requires a mobile device with ARCore (Android) or ARKit (iOS) support
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
