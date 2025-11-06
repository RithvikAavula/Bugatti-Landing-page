import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { ArrowRight, Gauge, Zap, Settings, Eye } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextType from "@/components/TextType";
import DomeGallery from "@/components/DomeGallery";
import CountUp from "@/components/CountUp";
import bugattiInteriorImage from "@assets/Bugatti-Chiron-Interior-02_1762419987969.jpg";
import bugattiExteriorImage from "@assets/david-leveque-esvWH-owWug-unsplash_1762419987972.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.1,
        ease: "power3.out",
      });

      if (statsRef.current) {
        gsap.from(".stat-card", {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ HERO SECTION */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* ✅ Fullscreen Hero Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="https://www.youtube.com/embed/NMThdHhrLoM?si=wjsN44r71Nv30aPq&autoplay=1&mute=1&controls=0&start=25&loop=1&playlist=NMThdHhrLoM&playsinline=1&rel=0&modestbranding=1"
            title="Bugatti — Fullscreen Hero Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            frameBorder="0"
          />
        </div>

        {/* ✅ Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent z-10" />

        {/* ✅ Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <h1 className="hero-title text-4xl sm:text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight">
            <TextType
              as="span"
              className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent"
              text="Unleash the Power"
              typingSpeed={120}
              initialDelay={0}
              showCursor={false}
            />
            <br />
            <TextType
              as="span"
              className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]"
              text="of Perfection"
              typingSpeed={120}
              initialDelay={2400}
              showCursor={true}
              cursorCharacter="|"
            />
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-foreground/70 mb-12 font-body font-light max-w-3xl mx-auto">
            Experience the pinnacle of automotive engineering. Configure your dream Bugatti with our revolutionary 3D visualizer.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/configurator">
              <Button
                size="lg"
                className="text-lg px-8 py-6 group"
                data-testid="button-hero-configure"
              >
                Start Configuring
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/models">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                data-testid="button-hero-models"
              >
                Explore Models
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ PERFORMANCE SECTION */}
      <section ref={statsRef} className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Performance Excellence
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="stat-card" neonBorder>
              <div className="flex flex-col items-center text-center">
                <Gauge className="h-12 w-12 text-primary mb-4" />
                <div className="text-5xl font-display font-bold text-primary mb-2">
                  <CountUp from={0} to={1578} separator="," duration={1.6} />
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  Horsepower
                </div>
              </div>
            </GlassCard>

            <GlassCard className="stat-card" neonBorder>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 text-cyan-400 mb-4" />
                <div className="text-5xl font-display font-bold text-cyan-400 mb-2 flex items-baseline">
                  <CountUp from={0} to={2.4} duration={1.2} />
                  <span className="ml-1">s</span>
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  0–100 km/h
                </div>
              </div>
            </GlassCard>

            <GlassCard className="stat-card" neonBorder>
              <div className="flex flex-col items-center text-center">
                <Settings className="h-12 w-12 text-blue-400 mb-4" />
                <div className="text-5xl font-display font-bold text-blue-400 mb-2 flex items-baseline">
                  <CountUp from={0} to={420} duration={1.4} />
                  <span className="ml-1">+</span>
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  km/h Top Speed
                </div>
              </div>
            </GlassCard>

            <GlassCard className="stat-card" neonBorder>
              <div className="flex flex-col items-center text-center">
                <Eye className="h-12 w-12 text-purple-400 mb-4" />
                <div className="text-5xl font-display font-bold text-purple-400 mb-2">
                  ∞
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  Innovation
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ✅ DESIGN SECTION */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                  Design & Innovation
                </span>
              </h2>
              <p className="text-lg text-foreground/70 mb-8 font-body">
                Every curve, every line, every detail is crafted to perfection.
                The Bugatti Chiron represents the ultimate fusion of art and
                engineering.
              </p>
              <Link href="/configurator">
                <Button size="lg" data-testid="button-customize">
                  Customize Your Own
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-md overflow-hidden border border-primary/20 shadow-2xl shadow-primary/20">
                <img
                  src={bugattiInteriorImage}
                  alt="Bugatti Interior"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🖼️ DOME GALLERY SECTION */}
      <section className="px-0 py-12">
        <div className="w-screen h-[80vh] md:h-[90vh] lg:h-screen">
          <DomeGallery
            images={[
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429240/Divo_front-view_aomjgp.avif",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429239/Divo_side-view-_left_-90_x0b4lm.avif",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429238/Divo_rear-left-view-121_nmyuxb.avif",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429238/Divo_rear-view-119_czrps6.avif",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429232/Divo_rear-right-side-48_vwutcr.avif",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429231/Divo_front-right-view-120_wcgdfw.avif",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762429232/Divo_cover_image-166_aqt9bm.avif",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426439/chiron_rear_left_view_ddw6nd.png",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426435/chiron_cover_image_rab1us.png",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426431/chiron_front_left_view_o4jrou.png",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426431/chiron_left_side_view_ej8ms8.png",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426430/chiron_rear_right_view_pnmkfw.png",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426430/chiron_front_view_hqjywl.png",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762426430/chiron_rear_view_mm2tmx.png",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762423531/flavien-LgruOWeSDLs-unsplash_cp5oss.jpg",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762423528/Gemini_Generated_Image_stolnsstolnsstol_dkbovs.png",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762423527/Gemini_Generated_Image_p70p78p70p78p70p_jbd62i.png",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762423522/flavien-q83jLmBCdzI-unsplash_ahbkzu.jpg",
              "https://res.cloudinary.com/dfnpgl0bb/image/upload/v1762423528/david-leveque-esvWH-owWug-unsplash_ioa1wc.jpg",
            ]}
            grayscale={false}
          />
        </div>
      </section>

      {/* ✅ HERITAGE SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="rounded-md overflow-hidden border border-primary/20 shadow-2xl shadow-primary/20">
                <img
                  src={bugattiExteriorImage}
                  alt="Bugatti Exterior"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Heritage of Excellence
                </span>
              </h2>
              <p className="text-lg text-foreground/70 mb-8 font-body">
                Since 1909, Bugatti has been synonymous with exceptional
                performance and unparalleled luxury. Each vehicle embodies over
                a century of automotive mastery.
              </p>
              <Link href="/heritage">
                <Button size="lg" variant="outline" data-testid="button-heritage">
                  Discover Our Legacy
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
