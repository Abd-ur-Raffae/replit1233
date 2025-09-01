import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SiReact, SiAngular, SiNodedotjs, SiJavascript, SiHtml5, SiCss3, SiGit, SiGithub } from "react-icons/si";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: "💻",
    color: "text-primary",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Angular.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Three.js", level: 85 },
    ],
  },
  {
    title: "Backend Development",
    icon: "⚙️",
    color: "text-accent",
    skills: [
      { name: "Ruby on Rails", level: 92 },
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 90 },
      { name: "REST APIs", level: 95 },
    ],
  },
  {
    title: "Database & Tools",
    icon: "🗄️",
    color: "text-emerald-400",
    skills: [
      { name: "MySQL", level: 90 },
      { name: "PostgreSQL", level: 88 },
      { name: "Git/GitHub", level: 95 },
      { name: "Testing Library", level: 85 },
    ],
  },
];

const techIcons = [
  { icon: SiReact, color: "text-blue-400" },
  { icon: SiAngular, color: "text-red-500" },
  { icon: SiNodedotjs, color: "text-green-500" },
  { icon: SiJavascript, color: "text-yellow-400" },
  { icon: SiHtml5, color: "text-orange-500" },
  { icon: SiCss3, color: "text-blue-500" },
  { icon: SiGit, color: "text-orange-600" },
  { icon: SiGithub, color: "text-foreground" },
];

export default function Skills() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section id="skills" className="py-20 bg-card/50" data-testid="skills-section">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
          data-testid="skills-title"
        >
          Skills & Technologies
        </motion.h2>

        <div className="max-w-6xl mx-auto" ref={ref}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                data-testid={`skill-category-${index}`}
              >
                <Card className="glass-card h-full">
                  <CardContent className="p-8">
                    <div className={`text-4xl mb-6 ${category.color}`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                    <div className="space-y-4">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground text-sm">{skill.name}</span>
                            <span className="text-muted-foreground text-sm">{skill.level}%</span>
                          </div>
                          <Progress
                            value={isIntersecting ? skill.level : 0}
                            className="h-2"
                            data-testid={`skill-progress-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 text-center"
            data-testid="tech-stack"
          >
            <h3 className="text-xl font-semibold mb-8 text-muted-foreground">Technologies I Work With</h3>
            <div className="flex flex-wrap justify-center gap-8 text-4xl">
              {techIcons.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.2, color: "hsl(194, 100%, 50%)" }}
                  className={`tech-stack-item ${tech.color}`}
                  data-testid={`tech-icon-${index}`}
                >
                  <tech.icon />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
