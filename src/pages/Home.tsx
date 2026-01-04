import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Sparkles, Palette, Lightbulb, Zap, Layers, PenTool } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import TextReveal from '@/components/TextReveal';
import MagneticButton from '@/components/MagneticButton';
import ScrollReveal from '@/components/ScrollReveal';

const Home = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Reduced floating icons for better performance (6 → 3)
  const floatingElements = useMemo(() => [
    { Icon: Sparkles, delay: 0, x: '8%', y: '18%', size: 32, rotation: 15 },
    { Icon: Palette, delay: 0.4, x: '88%', y: '12%', size: 36, rotation: -10 },
    { Icon: Lightbulb, delay: 0.8, x: '12%', y: '72%', size: 28, rotation: 20 },
  ], []);

  const stats = useMemo(() => [
    { number: '35+', label: language === 'ar' ? 'مشروع مكتمل' : 'Projects Done' },
    { number: '100+', label: language === 'ar' ? 'عميل سعيد' : 'Happy Clients' },
    { number: '5+', label: language === 'ar' ? 'سنوات خبرة' : 'Years Experience' },
  ], [language]);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-mesh opacity-60" />

        {/* Floating Icons - reduced from 6 to 3 with simpler CSS animation */}
        {floatingElements.map(({ Icon, delay, x, y: posY, size, rotation }, index) => (
          <div
            key={index}
            className="absolute text-primary/30 hidden md:block animate-float"
            style={{
              left: x,
              top: posY,
              transform: `rotate(${rotation}deg)`,
              animationDelay: `${delay}s`,
            }}
          >
            <Icon size={size} strokeWidth={1.5} />
          </div>
        ))}

        {/* Content */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 container mx-auto px-4 text-center"
        >
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="mb-10"
            >
              <span className="badge-glow">
                <Sparkles className="w-4 h-4 animate-pulse" />
                {language === 'ar' ? 'مرحباً بك في عالم الإبداع' : 'Welcome to Creative World'}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <h1 className="heading-xl mb-8 text-foreground text-balance">
                <TextReveal text={t('welcome')} staggerChildren={0.04} />
              </h1>
            </motion.div>

            {/* Subtitle */}
            <ScrollReveal delay={0.6}>
              <p className="text-xl md:text-2xl lg:text-3xl mb-14 text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                {t('heroSubtitle')}
              </p>
            </ScrollReveal>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link to="/portfolio">
                <MagneticButton>
                  <Button
                    size="lg"
                    className="btn-gradient relative overflow-hidden text-primary-foreground px-12 py-8 text-xl font-bold rounded-2xl shadow-2xl group"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      {t('viewPortfolio')}
                      <motion.span
                        animate={{ x: isRTL ? [-5, 0] : [0, 5] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                      >
                        {isRTL ? (
                          <ArrowLeft className="w-6 h-6" />
                        ) : (
                          <ArrowRight className="w-6 h-6" />
                        )}
                      </motion.span>
                    </span>
                  </Button>
                </MagneticButton>
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="mt-24 grid grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="text-center p-4 md:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10">
                    <motion.div
                      className="text-4xl md:text-6xl font-bold text-gradient mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 1.4 + index * 0.15,
                        type: 'spring',
                        stiffness: 200,
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm md:text-base text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
              {language === 'ar' ? 'اسحب للأسفل' : 'Scroll'}
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-3 rounded-full bg-primary"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Preview Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="badge-glow mb-6 inline-flex"
              >
                <Palette className="w-4 h-4" />
                {language === 'ar' ? 'خدماتي' : 'My Services'}
              </motion.span>
              <h2 className="heading-lg text-foreground mb-6">
                {language === 'ar' ? 'ماذا أقدم لك؟' : 'What I Offer'}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {language === 'ar'
                  ? 'أقدم حلول تصميم متكاملة تساعد علامتك التجارية على التميز'
                  : 'Comprehensive design solutions to make your brand stand out'}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: PenTool,
                title: language === 'ar' ? 'تصميم الشعارات' : 'Logo Design',
                description: language === 'ar'
                  ? 'شعارات فريدة تعكس هوية علامتك التجارية'
                  : 'Unique logos that reflect your brand identity',
              },
              {
                icon: Layers,
                title: language === 'ar' ? 'الهوية البصرية' : 'Brand Identity',
                description: language === 'ar'
                  ? 'هوية بصرية متكاملة ومتناسقة'
                  : 'Complete and cohesive visual identity',
              },
              {
                icon: Zap,
                title: language === 'ar' ? 'السوشيال ميديا' : 'Social Media',
                description: language === 'ar'
                  ? 'محتوى إبداعي يجذب جمهورك'
                  : 'Creative content that engages your audience',
              },
            ].map((service, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <motion.div
                  className="group relative p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA to Portfolio */}
          <ScrollReveal delay={0.5}>
            <div className="text-center mt-16">
              <Link to="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="btn-outline-glow px-8 py-6 text-lg font-semibold rounded-xl group"
                >
                  <span className="flex items-center gap-3">
                    {language === 'ar' ? 'شاهد أعمالي' : 'View My Work'}
                    {isRTL ? (
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </span>
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
