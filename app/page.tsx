"use client";

import { useRef } from "react";
import GridImages from "@/app/_components/GridImages";
import AnimatedCityModel from "@/app/_components/AnimatedCityModel";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronDown,
  Instagram,
  Camera,
  ImageIcon,
  Users,
  Calendar,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LPFooter from "@/app/_components/LPFooter";
import LPHeader from "@/app/_components/LPHeader";

export default function Web() {
  const heroRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "retratos", label: "Retratos" },
    { id: "paisagens", label: "Paisagens" },
    { id: "eventos", label: "Eventos" },
    { id: "comercial", label: "Comercial" },
  ];

  const services = [
    {
      title: "Ensaios Fotográficos",
      description:
        "Sessões personalizadas para capturar momentos especiais com qualidade profissional.",
      icon: <Camera className="h-10 w-10" />,
      price: "A partir de R$ 350",
    },
    {
      title: "Cobertura de Eventos",
      description:
        "Registre todos os momentos importantes do seu evento com um olhar artístico e atento aos detalhes.",
      icon: <Calendar className="h-10 w-10" />,
      price: "A partir de R$ 1.200",
    },
    {
      title: "Fotografia Comercial",
      description:
        "Valorize sua marca e produtos com imagens profissionais que destacam o melhor do seu negócio.",
      icon: <ImageIcon className="h-10 w-10" />,
      price: "A partir de R$ 800",
    },
    {
      title: "Ensaios em Grupo",
      description:
        "Sessões para famílias, amigos ou equipes, criando memórias coletivas em imagens de alta qualidade.",
      icon: <Users className="h-10 w-10" />,
      price: "A partir de R$ 500",
    },
  ];

  const testimonials = [
    {
      name: "Ana Oliveira",
      role: "Cliente - Ensaio Familiar",
      content:
        "As fotos capturaram perfeitamente a personalidade de cada membro da família. Um trabalho excepcional!",
      avatar: "A",
    },
    {
      name: "Ricardo Santos",
      role: "Diretor de Marketing",
      content:
        "As imagens para nossa campanha superaram todas as expectativas. Profissionalismo e criatividade impecáveis.",
      avatar: "R",
    },
    {
      name: "Juliana Costa",
      role: "Noiva",
      content:
        "Nosso casamento foi eternizado de forma mágica. Cada foto conta uma história e nos emociona novamente.",
      avatar: "J",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black text-center py-2 z-50">
        🚧 Este site está em desenvolvimento. Algumas funcionalidades podem não estar completas. 🚧
      </div>

      <LPHeader />

      <section
        ref={heroRef}
        className="w-full h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden"
        id="home"
      >
        <AnimatedCityModel sectionRef={heroRef} />

        <div className="container mx-auto px-4 z-10 absolute">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#4d080c]">
                Capturando Momentos, Criando Memórias
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Fotografia profissional com um olhar único para retratos,
                paisagens, eventos e muito mais.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Ver Portfólio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Contato
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 bg-gradient-to-b from-transparent to-background w-full h-32" />

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </section>

      <GridImages sectionRef={heroRef} />

      <section className="pb-24 bg-background" id="portfolio">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Meu Portfólio
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore meus trabalhos em diferentes estilos e categorias
            </motion.p>
          </div>

          <Tabs defaultValue="retratos" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0"
              ></TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-24 bg-muted/30" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Serviços
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Conheça os serviços fotográficos personalizados que ofereço
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-primary mb-2">{service.icon}</div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="p-0 h-auto">
                      Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background" id="about">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800"
                  alt="Fotógrafo"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 right-1/2 translate-x-1/2 md:translate-x-0 md:-right-6 bg-primary text-primary-foreground p-4 rounded-lg">
                <p className="font-bold">+10 anos</p>
                <p className="text-sm">de experiência</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Sobre Mim
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Olá! Sou João Silva, fotógrafo profissional com mais de 10
                  anos de experiência capturando momentos especiais e
                  transformando-os em memórias eternas.
                </p>
                <p>
                  Minha paixão pela fotografia começou ainda na adolescência e
                  se transformou em uma carreira dedicada a encontrar beleza em
                  cada enquadramento, seja em retratos expressivos, paisagens
                  deslumbrantes ou eventos memoráveis.
                </p>
                <p>
                  Trabalho com diversos estilos fotográficos, adaptando minha
                  técnica para atender às necessidades específicas de cada
                  cliente e projeto, sempre com um olhar atento aos detalhes e à
                  qualidade final.
                </p>
                <p>
                  Meu objetivo é superar expectativas e entregar imagens que não
                  apenas documentam momentos, mas contam histórias e despertam
                  emoções.
                </p>
              </div>

              <div className="mt-8 flex gap-4">
                <Button>
                  Entre em Contato
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">
                  Ver Instagram
                  <Instagram className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              O Que Dizem Meus Clientes
            </motion.h2>
            <motion.p
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Depoimentos de pessoas que confiaram em meu trabalho
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.name}`}
                        />
                        <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background" id="contact">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Entre em Contato
              </h2>
              <p className="text-muted-foreground mb-8">
                Estou disponível para novos projetos, sessões fotográficas e
                parcerias. Preencha o formulário ou utilize os dados de contato
                para conversarmos.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">
                      contato@joaosilva.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-muted-foreground">(11) 98765-4321</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Localização</p>
                    <p className="text-muted-foreground">
                      São Paulo, SP - Brasil
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-muted-foreground">
                      @joaosilva.fotografia
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Envie uma Mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo para solicitar orçamentos ou
                    tirar dúvidas.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nome
                        </label>
                        <Input id="name" placeholder="Seu nome completo" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Assunto
                      </label>
                      <Input id="subject" placeholder="Assunto da mensagem" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        Mensagem
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Descreva seu projeto ou dúvida..."
                        rows={5}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Enviar Mensagem
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Instagram
            </h2>
            <p className="text-muted-foreground">
              Siga-me no Instagram{" "}
              <a href="#" className="text-primary font-medium">
                @joaosilva.fotografia
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="block aspect-square overflow-hidden rounded-md relative group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: item * 0.05 }}
                viewport={{ once: true }}
              >
                <img
                  src={`https://images.unsplash.com/photo-1552168324-d612d77725e3?w=300&h=300&fit=crop&q=80&random=${item}`}
                  alt={`Instagram post ${item}`}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="text-white h-6 w-6" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <LPFooter />
    </main>
  );
}
