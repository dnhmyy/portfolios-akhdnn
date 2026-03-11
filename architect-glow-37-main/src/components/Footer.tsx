import { Github, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border bg-card">
    <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-body text-sm text-muted-foreground">
        © {new Date().getFullYear()} Akhdan Fadhilillah Ps. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-200"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-200"
        >
          <Github className="w-5 h-5" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
