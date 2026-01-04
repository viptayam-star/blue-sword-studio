import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Mail,
  Phone,
  Instagram,
  Twitter,
  Dribbble,
  Linkedin,
  Send,
  MessageCircle,
  Sparkles,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';

const Contact = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: language === 'ar' ? 'تم الإرسال' : 'Message Sent',
      description:
        language === 'ar' ? 'تم إرسال رسالتك بنجاح' : 'Your message has been sent successfully',
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleWhatsApp = () => {
    const phoneNumber = '201022065189';
    const message =
      language === 'ar'
        ? 'مرحباً، أريد الاستفسار عن خدمات التصميم'
        : 'Hello, I would like to inquire about design services';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t('email'),
      value: 'viptayam@gmail.com',
      href: 'mailto:viptayam@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      label: t('phone'),
      value: '01022065189',
      href: 'tel:+201022065189',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      label: language === 'ar' ? 'الموقع' : 'Location',
      value: language === 'ar' ? 'مصر' : 'Egypt',
      href: '#',
      gradient: 'from-primary to-accent',
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-500/20 hover:text-pink-500' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500/20 hover:text-sky-500' },
    { icon: Dribbble, href: '#', label: 'Dribbble', color: 'hover:bg-pink-400/20 hover:text-pink-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600/20 hover:text-blue-600' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-glow mb-6 inline-flex"
            >
              <MessageCircle className="w-4 h-4" />
              {language === 'ar' ? 'تواصل معي' : 'Get In Touch'}
            </motion.span>
            <h1 className="heading-lg text-foreground mb-6">{t('contactTitle')}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('contactSubtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <ScrollReveal delay={0.2}>
            <motion.div
              className="relative p-8 md:p-10 rounded-3xl bg-card border border-border/30"
              whileHover={{ borderColor: 'hsl(var(--primary) / 0.3)' }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient Border Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />

              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {language === 'ar' ? 'أرسل رسالة' : 'Send Message'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? 'سأرد عليك في أقرب وقت' : "I'll get back to you soon"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    {language === 'ar' ? 'الاسم' : 'Name'}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'اكتب اسمك' : 'Enter your name'}
                    className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'example@email.com' : 'example@email.com'}
                    className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-medium">
                    {language === 'ar' ? 'الرسالة' : 'Message'}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                    rows={5}
                    className="rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <MagneticButton>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gradient text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting
                        ? language === 'ar'
                          ? 'جاري الإرسال...'
                          : 'Sending...'
                        : language === 'ar'
                          ? 'إرسال الرسالة'
                          : 'Send Message'}
                      {!isSubmitting && <Send className="w-5 h-5" />}
                    </span>
                  </Button>
                </MagneticButton>
              </form>
            </motion.div>
          </ScrollReveal>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <ScrollReveal delay={0.3}>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/30 hover:border-primary/30 transition-all duration-300 group"
                    whileHover={{ x: isRTL ? -8 : 8 }}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                      <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                    {isRTL ? (
                      <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    ) : (
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </motion.a>
                ))}
              </div>
            </ScrollReveal>

            {/* WhatsApp CTA */}
            <ScrollReveal delay={0.4}>
              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {language === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'رد سريع ومباشر' : 'Fast & direct response'}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-xl font-semibold"
                >
                  {language === 'ar' ? 'ابدأ المحادثة' : 'Start Chat'}
                </Button>
              </motion.div>
            </ScrollReveal>

            {/* Social Media */}
            <ScrollReveal delay={0.5}>
              <div className="p-6 rounded-2xl bg-card border border-border/30">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {language === 'ar' ? 'تابعني على' : 'Follow Me'}
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center transition-all duration-300 ${social.color}`}
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;