import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution built with React and Ruby on Rails, featuring real-time inventory management and 3D product previews.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      { name: "React", color: "bg-primary/20 text-primary" },
      { name: "Rails", color: "bg-accent/20 text-accent" },
      { name: "Three.js", color: "bg-emerald-400/20 text-emerald-400" },
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive charts and data visualization, built with Angular and Node.js backend.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      { name: "Angular", color: "bg-red-500/20 text-red-500" },
      { name: "Node.js", color: "bg-green-500/20 text-green-500" },
      { name: "PostgreSQL", color: "bg-blue-500/20 text-blue-500" },
    ],
    github: "#",
    demo: "#",
  },
  {
    title: "3D Portfolio Showcase",
    description: "Interactive 3D portfolio website featuring immersive animations and model interactions using React Three Fiber.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      { name: "React", color: "bg-primary/20 text-primary" },
      { name: "Three.js", color: "bg-purple-500/20 text-purple-500" },
      { name: "WebGL", color: "bg-yellow-500/20 text-yellow-500" },
    ],
    github: "#",
    demo: "#",
  },
];

export default function Projects() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section id="projects" className="py-20 bg-card/50" data-testid="projects-section">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
          data-testid="projects-title"
        >
          Featured Projects
        </motion.h2>

        <div className="max-w-6xl mx-auto" ref={ref}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -12 }}
                data-testid={`project-${index}`}
              >
                <Card className="glass-card overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={tech.name}
                          className={`px-3 py-1 text-xs ${tech.color}`}
                          data-testid={`project-tech-${tech.name.toLowerCase()}`}
                        >
                          {tech.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 p-0"
                        data-testid={`project-github-${index}`}
                      >
                        <Github size={20} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 p-0"
                        data-testid={`project-demo-${index}`}
                      >
                        <ExternalLink size={20} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
            data-testid="view-all-projects"
          >
            <Button
              variant="outline"
              className="border-primary text-primary px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              data-testid="button-view-all-projects"
            >
              View All Projects
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
