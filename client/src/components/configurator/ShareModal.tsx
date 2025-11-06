import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Share2, Copy, Mail, Check } from "lucide-react";
import QRCode from "qrcode";
import { useEffect, useRef } from "react";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: any;
  savedConfiguration?: any;
}

export function ShareModal({ open, onOpenChange, config, savedConfiguration }: ShareModalProps) {
  const { toast } = useToast();
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (open) {
      const configId = savedConfiguration?.shareUrl || Math.random().toString(36).substr(2, 9);
      const url = `${window.location.origin}/shared/${configId}`;
      setShareUrl(url);

      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, url, {
          width: 200,
          margin: 2,
          color: {
            dark: "#0ea5e9",
            light: "#0a0a0a",
          },
        });
      }
    }
  }, [open]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link Copied",
      description: "Share URL copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Check out my Bugatti configuration!");
    const body = encodeURIComponent(`I've configured my dream Bugatti. Check it out: ${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share Your Configuration
          </DialogTitle>
          <DialogDescription>
            Share your unique Bugatti configuration with friends
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="share-url">Share Link</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                className="flex-1"
                data-testid="input-share-url"
              />
              <Button
                size="icon"
                onClick={handleCopy}
                className="shrink-0"
                data-testid="button-copy-url"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex justify-center py-4">
            <div className="p-4 bg-background rounded-md border border-primary/20">
              <canvas ref={canvasRef} />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleEmailShare}
              variant="outline"
              className="flex-1 gap-2"
              data-testid="button-email-share"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button
              onClick={handleCopy}
              className="flex-1 gap-2"
              data-testid="button-copy-link"
            >
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            Configuration Value: <span className="text-primary font-bold">${config.price?.toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
