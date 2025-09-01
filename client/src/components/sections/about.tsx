import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Badge } from "@/components/ui/badge";

const traits = ["Problem Solver", "Team Player", "Quick Learner", "3D Enthusiast"];

export default function About() {
  const { ref, isIntersecting } = useIntersectionObserver();

  return (
    <section id="about" className="py-20 relative" data-testid="about-section">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
            data-testid="about-title"
          >
            About Me
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center" ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-testid="about-image"
            >
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Professional developer workspace"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              data-testid="about-content"
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                As a Full-Stack Developer at Sprint Synergy, I am responsible for the end-to-end development of web applications,
                specializing in both front-end and back-end architecture.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                On the front-end, I develop responsive user interfaces with ReactJS and AngularJS, creating elegant and functional
                designs with Tailwind CSS. I also push the boundaries of traditional web experiences by integrating interactive 3D
                models and animations using React Three Fiber.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                On the back-end, I build robust solutions using Ruby on Rails, Node.js, and Express.js, effectively managing data
                across MySQL and PostgreSQL databases.
              </p>

              <div className="flex flex-wrap gap-3" data-testid="about-traits">
                {traits.map((trait, index) => (
                  <motion.div
                    key={trait}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <Badge variant="secondary" className="px-4 py-2 text-sm">
                      {trait}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
