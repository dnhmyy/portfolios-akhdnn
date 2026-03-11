import { Monitor, Container, Server, Wifi, Network, Code, GitBranch } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const skills = [
  { name: "Linux", icon: Monitor },
  { name: "Proxmox VE", icon: Server },
  { name: "Docker", icon: Container },
  { name: "MikroTik", icon: Wifi },
  { name: "Cisco", icon: Network },
  { name: "Python", icon: Code },
  { name: "GitHub", icon: GitBranch },
];

const SkillsSection = () => (
  <section id="skills" className="py-24">
    <div className="max-w-4xl mx-auto px-6">
      <ScrollReveal>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-center mb-16">
          Skills
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((s, i) => (
          <ScrollReveal key={s.name} delay={i * 0.05}>
            <div className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card card-shadow hover:card-shadow-hover hover:border-primary/30 transition-all duration-300">
              <s.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              <span className="font-mono-code text-sm font-medium text-foreground">{s.name}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
