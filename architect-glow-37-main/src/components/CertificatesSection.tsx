import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const certs = [
  { name: "MikroTik MTCNA", issuer: "MikroTik", color: "from-blue-500/20 to-cyan-500/20" },
  { name: "MikroTik MTCRE", issuer: "MikroTik", color: "from-cyan-500/20 to-teal-500/20" },
  { name: "Proxmox VE Admin", issuer: "Proxmox", color: "from-orange-500/20 to-amber-500/20" },
  { name: "Dicoding - Cloud Practitioner", issuer: "Dicoding", color: "from-indigo-500/20 to-violet-500/20" },
  { name: "Cisco CCNA", issuer: "Cisco", color: "from-emerald-500/20 to-green-500/20" },
];

const CertificatesSection = () => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const next = Math.max(0, Math.min(certs.length - 1, active + dir));
    setActive(next);
    scrollRef.current?.children[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section id="certificates" className="py-24 bg-background-alt">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-center mb-16">
            Certificates
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border card-shadow flex items-center justify-center hover:border-primary transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border card-shadow flex items-center justify-center hover:border-primary transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Cards */}
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 pb-4">
            {certs.map((c, i) => (
              <ScrollReveal key={i} delay={i * 0.05} className="snap-center shrink-0 w-64 sm:w-72">
                <div
                  className={`group rounded-xl border border-border bg-card card-shadow p-6 text-center transition-all duration-300 hover:card-shadow-hover ${
                    active === i ? "ring-2 ring-primary/30" : ""
                  }`}
                  onClick={() => setActive(i)}
                >
                  <div className={`w-full h-36 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-5 transition-all duration-300 grayscale group-hover:grayscale-0`}>
                    <span className="font-display font-bold text-foreground/60 text-sm">{c.issuer}</span>
                  </div>
                  <h3 className="font-display font-bold text-sm">{c.name}</h3>
                  <p className="font-body text-xs text-muted-foreground mt-1">{c.issuer}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {certs.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  scrollRef.current?.children[i]?.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  active === i ? "bg-primary glow-blue scale-125" : "bg-border hover:bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
