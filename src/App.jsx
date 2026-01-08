import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Users, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const slides = [
  {
    id: 'intro',
    type: 'title',
    title: 'Projeto de Aulas On-line em formato inédito',
    subtitle: 'EDP ADVEC Sorocaba',
    image: '/slide-1.png',
  },
  {
    id: 'slide1',
    title: '1. Introdução',
    subtitle: 'Transformando desafios em oportunidades',
    content: [
      'Diante das dificuldades temos 2 opções: focar nos desafios ou enxergar oportunidades de crescimento.',
      'A Bíblia traz vários exemplos dessa postura: Gideão, Davi e os 12 espias.',
      'Sempre existirão duas perspectivas: observar passivamente ou agir com fé e atitude.',
      'Com esse espírito, a EDP ADVEC Sorocaba inicia o Projeto PodClass.'
    ],
    image: '/slide-1.png',
    icon: <Lightbulb className="w-12 h-12 text-primary" />,
  },
  {
    id: 'slide2',
    title: '2. Justificativa e Relevância',
    subtitle: 'Por que o PodClass é necessário?',
    content: [
      'A rotina e os eventos da igreja impedem que todas as lições da revista sejam aplicadas presencialmente.',
      'O formato podcast permite complementar o estudo com conteúdo dinâmico e acessível.',
      'É também uma ferramenta evangelística, alcançando pessoas que têm barreiras com instituições religiosas.'
    ],
    image: '/slide-2.jpeg',
    icon: <BookOpen className="w-12 h-12 text-primary" />,
  },
  {
    id: 'slide3',
    title: '3. Metodologia e Público-Alvo',
    subtitle: 'Como o PodClass será desenvolvido',
    content: [
      'Aulas roteirizadas em formato de diálogo: apresentador, professor e participantes.',
      'Edição cuidadosa para garantir clareza, fluidez e qualidade.',
      'Público-alvo: Jovens, adultos, usuários de redes sociais (Instagram e YouTube).',
      'Professores que buscam conteúdo descontraído para enriquecer suas aulas.'
    ],
    image: '/slide-3.png',
    icon: <Users className="w-12 h-12 text-primary" />,
  },
  {
    id: 'slide4',
    title: '4. Conclusão',
    subtitle: 'O início de uma grande jornada',
    content: [
      'O projeto está em fase inicial e a equipe ainda está sendo estruturada.',
      'Temos convicção de que o PodClass abençoará muitas vidas.',
      'Agora, vamos apresentar um trecho da nossa gravação piloto.'
    ],
    image: '/slide-4.jpeg',
    icon: <Play className="w-12 h-12 text-primary" />,
  },
  {
    id: 'final',
    title: 'Obrigado!',
    subtitle: 'Nome da Equipe & Agradecimentos',
    content: [
      'Equipe EDP ADVEC Sorocaba',
      'Agradecemos a atenção de todos!'
    ],
    icon: <CheckCircle2 className="w-12 h-12 text-primary" />,
    image: '/slide-1.png',
  }
]

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1)
      setCurrentSlide(s => s + 1)
    }
  }, [currentSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(s => s - 1)
    }
  }, [currentSlide])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const slide = slides[currentSlide]

  return (
    <div className="fixed inset-0 bg-background overflow-hidden flex flex-col font-sans">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-muted z-50">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Persistent Logo */}
      <div className="absolute top-6 right-8 z-50">
        <img src="/slide-1.png" alt="PodClass Logo" className="w-24 md:w-32 h-auto opacity-80" />
      </div>

      <main className="flex-1 relative flex items-center justify-center p-4 md:p-12">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0 flex items-center justify-center p-8 md:p-16"
          >
            {slide.type === 'title' ? (
              <div className="text-center space-y-8 max-w-4xl">
                <motion.img 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  src={slide.image} 
                  alt="Logo" 
                  className="w-80 md:w-[450px] h-auto mx-auto mb-12 object-contain"
                />
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-6xl font-black text-primary tracking-tighter"
                >
                  {slide.title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl md:text-4xl text-muted-foreground font-medium"
                >
                  {slide.subtitle}
                </motion.p>
              </div>
            ) : (
              <Card className="w-full max-w-6xl h-full border-none shadow-none bg-transparent flex flex-col justify-center">
                <CardContent className="grid md:grid-cols-2 gap-12 items-center p-0">
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      {slide.icon}
                      <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary">{slide.title}</h2>
                        <p className="text-xl md:text-2xl text-muted-foreground">{slide.subtitle}</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-6">
                      {slide.content.map((item, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2 + (idx * 0.1) }}
                          className="flex items-start gap-4 text-xl md:text-2xl leading-relaxed"
                        >
                          <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                  >
                    {slide.image ? (
                      <div className="relative group">
                        <img 
                          src={slide.image} 
                          alt="Slide visual" 
                          className="rounded-3xl shadow-2xl w-full aspect-video object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-primary/5 rounded-3xl aspect-video flex items-center justify-center">
                         <img src="/slide-1.png" className="w-32 opacity-20 grayscale" alt="" />
                      </div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex gap-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="rounded-full w-12 h-12 border-primary/20 hover:bg-primary/10"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="flex items-center px-4 font-medium text-muted-foreground">
          {currentSlide + 1} / {slides.length}
        </div>
        <Button 
          variant="default" 
          size="icon" 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Background Decor */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
    </div>
  )
}

export default App