import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MouseSpotlight from "@/components/MouseSpotlight";

const Index = () => {
  return (
    <>
      <MouseSpotlight />
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificatesSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;
