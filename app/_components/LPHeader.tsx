
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Menu,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function LPHeader() {
    function scrollToSection(id: string) {
        const element = document.getElementById(id);
            if (element) {
            element.scrollIntoView({
                behavior: "smooth",
            });
        }
    }

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="w-full bg-yellow-500 text-black text-center py-2 z-50">
        🚧 IN DEVELOPMENT 🚧
      </div>

      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold"
          >
            JOÃO SILVA
            <span className="text-xs block text-muted-foreground">
              FOTOGRAFIA
            </span>
          </motion.div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <motion.a
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => scrollToSection('hero')}
          >
            Início
          </motion.a>

          <motion.a
            href="#portfolio"
            className="text-sm font-medium hover:text-primary transition-colors"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => scrollToSection('portfolio')}
          >
            Portfólio
          </motion.a>

          <motion.a
            href="#services"
            className="text-sm font-medium hover:text-primary transition-colors"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => scrollToSection('services')}
          >
            Serviços
          </motion.a>

          <motion.a
            href="#about"
            className="text-sm font-medium hover:text-primary transition-colors"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={() => scrollToSection('about')}
          >
            Sobre
          </motion.a>

          <motion.a
            href="#contact"
            className="text-sm font-medium hover:text-primary transition-colors"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={() => scrollToSection('contact')}
          >
            Contato
          </motion.a>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button size="sm">
              Agendar Sessão
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                <a
                  href="#"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => scrollToSection('about')}
                >
                  Início
                </a>

                <a
                  href="#portfolio"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => scrollToSection('portfolio')}
                >
                  Portfólio
                </a>

                <a
                  href="#services"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => scrollToSection('services')}
                >
                  Serviços
                </a>

                <a
                  href="#about"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => scrollToSection('about')}
                >
                  Sobre
                </a>

                <a
                  href="#contact"
                  className="text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => scrollToSection('contact')}
                >
                  Contato
                </a>

                <Button className="mt-4">
                  Agendar Sessão
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
