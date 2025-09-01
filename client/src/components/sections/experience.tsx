import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, School } from "lucide-react";

const experiences = [
  {
    title: "Full Stack Engineer",
    company: "SprintSynergy",
    period: "December 2023 - Present (1 year 10 months)",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
    responsibilities: [
      "Engineered and delivered responsive, high-performance web applications using React.js, while ensuring clean and modern design with Tailwind CSS and custom styling.",
      "Developed robust full-stack solutions by leveraging backend technologies including Ruby on Rails, Node.js, and Express.js and managing data with MySQL and PostgreSQL.",
      "Integrated immersive 3D models and interactive animations into user interfaces using React Three Fiber to create rich, engaging digital experiences.",
      "Ensured application quality and reliability by performing both manual and automated front-end testing with tools like React Testing Library.",
      "Collaborated closely with cross-functional teams using Git/GitHub for version control and actively participated in agile rituals like daily stand-ups and sprint planning.",
    ],
  },
];

const education = [
  {
    degree: "Bachelor's Degree",
    field: "Computer Science",
    institution: "University of Sargodha",
    period: "2021 - 2025",
    icon: GraduationCap,
    color: "text-primary",
  },
  {
    degree: "Intermediate",
    field: "FSc Pre-Engineering",
    institution: "ILM College",
    period: "2019 - 2021",
    icon: School,
    color: "text-accent",
  },
];

export default function Experience() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section id="experience" className="py-20" data-testid="experience-section">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
          data-testid="experience-title"
        >
          Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto" ref={ref}>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent hidden lg:block" />

            {/* Experience Items */}
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="mb-12 lg:ml-20 relative"
                data-testid={`experience-${index}`}
              >
                {/* Timeline Dot */}
                <div className="absolute -left-12 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background hidden lg:block" />

                <Card className="glass-card">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                        <h4 className="text-xl text-primary mb-2">{exp.company}</h4>
                        <div className="flex items-center gap-4 text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span className="text-sm">{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <img
                        src={exp.image}
                        alt="Modern tech office environment"
                        className="rounded-lg w-full lg:w-48 h-32 object-cover mt-4 lg:mt-0"
                      />
                    </div>

                    <div className="space-y-4 text-muted-foreground">
                      {exp.responsibilities.map((responsibility, respIndex) => (
                        <motion.div
                          key={respIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.5 + respIndex * 0.1 }}
                          className="flex items-start gap-3"
                          data-testid={`responsibility-${respIndex}`}
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0" />
                          <p>{responsibility}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
            data-testid="education-section"
          >
            <h3 className="text-2xl font-bold mb-8 gradient-text text-center">Education</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                  data-testid={`education-${index}`}
                >
                  <Card className="glass-card h-full">
                    <CardContent className="p-6">
                      <div className={`text-3xl mb-4 ${edu.color}`}>
                        <edu.icon size={48} />
                      </div>
                      <h4 className="text-xl font-semibold mb-2">{edu.degree}</h4>
                      <p className="text-muted-foreground mb-1">{edu.field}</p>
                      <p className="text-sm text-muted-foreground mb-2">{edu.institution}</p>
                      <Badge variant="outline" className={`text-sm ${edu.color} border-current`}>
                        {edu.period}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
