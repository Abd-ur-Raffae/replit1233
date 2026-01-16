import Navigation from "@/components/layout/navigation";
import ScrollProgress from "@/components/ui/scroll-progress";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <footer className="bg-card/80 border-t border-border py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2026 Abd-ur-Raffae Masood. Crafted with ❤️. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
