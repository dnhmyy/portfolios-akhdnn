import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    title: "Enterprise Network Overhaul",
    desc: "Redesigned multi-branch network with MikroTik routers, VPN tunnels, and QoS policies.",
    tags: ["MikroTik", "VPN", "QoS"],
  },
  {
    title: "Proxmox Virtualization Cluster",
    desc: "Deployed HA cluster with live migration, Ceph storage, and automated backups.",
    tags: ["Proxmox", "Ceph", "HA"],
  },
  {
    title: "Docker Microservices Platform",
    desc: "Containerized internal apps with Docker Compose, Traefik reverse proxy, and CI/CD pipeline.",
    tags: ["Docker", "Traefik", "CI/CD"],
  },
  {
    title: "Network Monitoring Dashboard",
    desc: "Built real-time monitoring using Grafana, Prometheus, and SNMP for 100+ network devices.",
    tags: ["Grafana", "Prometheus", "SNMP"],
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24">
    <div className="max-w-5xl mx-auto px-6">
      <ScrollReveal>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-center mb-16">
          Projects
        </h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <div className="group relative rounded-xl border border-border bg-card overflow-hidden card-shadow hover:card-shadow-hover transition-shadow duration-300">
              {/* Colored top bar */}
              <div className="h-40 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                <span className="font-mono-code text-primary/30 text-6xl font-bold select-none">
                  {`0${i + 1}`}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-display font-bold text-primary-foreground text-sm tracking-wide">View Live →</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-lg mb-2">{p.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="font-mono-code text-xs px-2.5 py-1 rounded-md bg-primary/5 text-primary border border-primary/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
