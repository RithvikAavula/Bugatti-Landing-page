import { useEffect, useRef } from "react";
import { GlassCard } from "@/components/GlassCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: "1909", title: "Foundation", description: "Ettore Bugatti founded the company in Molsheim, Alsace" },
  { year: "1924", title: "Type 35", description: "The legendary racing car wins over 2,000 races" },
  { year: "1936", title: "Type 57SC Atlantic", description: "One of the most beautiful cars ever created" },
  { year: "1987", title: "EB110", description: "The rebirth of Bugatti with a modern supercar" },
  { year: "2005", title: "Veyron 16.4", description: "Breaking the 400 km/h barrier" },
  { year: "2016", title: "Chiron", description: "1,578 horsepower of pure engineering excellence" },
  { year: "2020", title: "Bolide", description: "The ultimate expression of Bugatti performance" },
  { year: "2024", title: "Future", description: "Continuing the legacy of innovation and excellence" },
];

export default function Heritage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
        opacity: 0,
        x: -50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              A Legacy of Excellence
            </span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-body">
            Over a century of automotive mastery, innovation, and uncompromising performance
          </p>
        </div>

        <div className="mb-24">
          <GlassCard neonBorder className="p-12">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-foreground/80 font-body leading-relaxed">
                Since 1909, Bugatti has been synonymous with exceptional performance, breathtaking design, and unparalleled luxury. Founded by Ettore Bugatti in Molsheim, France, the brand has consistently pushed the boundaries of what is possible in automotive engineering.
              </p>
              <p className="text-lg text-foreground/80 font-body leading-relaxed mt-4">
                From the legendary Type 35 racing car to the modern Chiron hypercar, every Bugatti represents the perfect fusion of art and science. Each vehicle is a masterpiece, meticulously crafted to deliver an unforgettable driving experience.
              </p>
            </div>
          </GlassCard>
        </div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-cyan-400 to-primary" />

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="timeline-item relative pl-20" data-testid={`timeline-${index}`}>
                <div className="absolute left-4 w-9 h-9 rounded-full bg-primary flex items-center justify-center border-4 border-background">
                  <div className="w-2 h-2 rounded-full bg-background" />
                </div>

                <GlassCard>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="text-4xl font-display font-bold text-primary min-w-[100px]">
                      {item.year}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-display font-bold mb-2">{item.title}</h3>
                      <p className="text-foreground/70 font-body">{item.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
