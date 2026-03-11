import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    alert("Terima kasih! Pesan Anda telah dikirim.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-background-alt">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-center mb-16">
            Contact
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left */}
          <ScrollReveal>
            <div>
              <h3 className="font-display font-bold text-2xl mb-4">Get in Touch</h3>
              <p className="font-body text-muted-foreground mb-8 leading-relaxed">
                Tertarik berkolaborasi atau punya pertanyaan? Jangan ragu untuk menghubungi saya.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card card-shadow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground">Email</p>
                    <p className="font-mono-code text-sm">akhdan@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card card-shadow">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground">Telepon</p>
                    <p className="font-mono-code text-sm">+62 812 xxxx xxxx</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Form */}
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-1.5">Pesan</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  placeholder="Tulis pesan Anda..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-foreground text-background font-body font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
              >
                Kirim Pesan
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
