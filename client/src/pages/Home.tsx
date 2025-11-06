import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Scene3D } from "@/components/3d/Scene3D";
import { BugattiCar3D } from "@/components/3d/BugattiCar3D";
import { GlassCard } from "@/components/GlassCard";
import { ArrowRight, Gauge, Zap, Settings, Eye } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Scene3D>
            <BugattiCar3D autoRotate scale={1.2} />
          </Scene3D>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="hero-title text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Unleash the Power
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              of Perfection
            </span>
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-foreground/70 mb-12 font-body font-light max-w-3xl mx-auto">
            Experience the pinnacle of automotive engineering. Configure your dream Bugatti with our revolutionary 3D visualizer.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/configurator">
              <Button size="lg" className="text-lg px-8 py-6 group" data-testid="button-hero-configure">
                Start Configuring
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/models">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" data-testid="button-hero-models">
                Explore Models
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-24 px-4">
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
                <div className="text-5xl font-display font-bold text-primary mb-2">1,578</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Horsepower</div>
              </div>
            </GlassCard>

            <GlassCard className="stat-card" neonBorder>
              <div className="flex flex-col items-center text-center">
                <Zap className="h-12 w-12 text-cyan-400 mb-4" />
                <div className="text-5xl font-display font-bold text-cyan-400 mb-2">2.4s</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">0-100 km/h</div>
              </div>
            </GlassCard>

            <GlassCard className="stat-card" neonBorder>
              <div className="flex flex-col items-center text-center">
                <Settings className="h-12 w-12 text-blue-400 mb-4" />
                <div className="text-5xl font-display font-bold text-blue-400 mb-2">420+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">km/h Top Speed</div>
              </div>
            </GlassCard>

            <GlassCard className="stat-card" neonBorder>
              <div className="flex flex-col items-center text-center">
                <Eye className="h-12 w-12 text-purple-400 mb-4" />
                <div className="text-5xl font-display font-bold text-purple-400 mb-2">∞</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Innovation</div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

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
                Every curve, every line, every detail is crafted to perfection. The Bugatti Chiron represents the ultimate fusion of art and engineering.
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
                Since 1909, Bugatti has been synonymous with exceptional performance and unparalleled luxury. Each vehicle embodies over a century of automotive mastery.
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
