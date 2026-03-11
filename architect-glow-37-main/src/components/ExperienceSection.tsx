import ScrollReveal from "./ScrollReveal";

const experiences = [
  {
    role: "IT Support Administrator",
    company: "BPR Dana Bintan Sejahtera",
    period: "2023 — Present",
    desc: "Managing IT infrastructure including servers, networks, and security systems. Providing technical support for 50+ users across multiple branches.",
  },
  {
    role: "Computer Network Engineer",
    company: "Pemerintah Kabupaten Bintan",
    period: "2022 — 2023",
    desc: "Designed and maintained enterprise-grade network infrastructure for government offices. Implemented VLAN segmentation and firewall policies.",
  },
  {
    role: "Technical Support",
    company: "PT. Lintas Jaringan Nusantara",
    period: "2021 — 2022",
    desc: "Handled network troubleshooting, ISP customer support, and infrastructure deployment for fiber-optic and wireless networks.",
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-24 bg-background-alt">
    <div className="max-w-4xl mx-auto px-6">
      <ScrollReveal>
        <h2 className="font-display font-black text-3xl sm:text-4xl text-center mb-16">
          Experience
        </h2>
      </ScrollReveal>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

        {experiences.map((exp, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <div className={`relative flex flex-col md:flex-row items-start mb-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-blue z-10 mt-2" />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <span className="font-mono-code text-xs text-primary font-medium">{exp.period}</span>
                <h3 className="font-display font-bold text-lg mt-1">{exp.role}</h3>
                <p className="font-body text-sm text-muted-foreground mt-0.5">{exp.company}</p>
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">{exp.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
