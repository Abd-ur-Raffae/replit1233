import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { SiLinkedin, SiGithub } from "react-icons/si";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "link2abdulrafay@gmail.com",
    color: "text-primary",
    href: "mailto:link2abdulrafay@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+92 306 755 7599",
    color: "text-accent",
    href: "tel:+923067557599",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Sargodha, Punjab, Pakistan",
    color: "text-emerald-400",
  },
];

const socialLinks = [
  {
    icon: SiLinkedin,
    href: "https://www.linkedin.com/in/abd-ur-raffae",
    label: "LinkedIn",
  },
  {
    icon: SiGithub,
    href: "#",
    label: "GitHub",
  },
  {
    icon: Mail,
    href: "mailto:link2abdulrafay@gmail.com",
    label: "Email",
  },
];

export default function Contact() {
  const { ref, isIntersecting } = useIntersectionObserver();

  const handleDownloadResume = () => {
    // This would typically download the actual resume file
    console.log("Downloading resume...");
  };

  return (
    <section id="contact" className="py-20" data-testid="contact-section">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
          data-testid="contact-title"
        >
          Get In Touch
        </motion.h2>

        <div className="max-w-4xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
            data-testid="contact-description"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
              Feel free to reach out if you'd like to work together!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                data-testid={`contact-info-${index}`}
              >
                <Card className="glass-card h-full">
                  <CardContent className="p-8 text-center">
                    <div className={`text-4xl mb-4 ${info.color}`}>
                      <info.icon size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data-testid={`contact-link-${info.title.toLowerCase()}`}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.value}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-12"
            data-testid="social-links"
          >
            <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isIntersecting ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.2, color: "hsl(194, 100%, 50%)" }}
                  className="text-3xl text-muted-foreground hover:text-primary transition-colors duration-300"
                  data-testid={`social-link-${social.label.toLowerCase()}`}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Download Resume */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center"
            data-testid="download-resume"
          >
            <Button
              onClick={handleDownloadResume}
              className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 hover:scale-105 transition-all duration-300 shadow-lg"
              data-testid="button-download-resume"
            >
              <Download className="mr-2" size={20} />
              Download Resume
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
