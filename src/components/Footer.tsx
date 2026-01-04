import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Instagram, Twitter, Dribbble, Linkedin, Sparkles, Heart, Award, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const { language, t } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500 hover:bg-pink-500/10' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500 hover:bg-sky-500/10' },
    { icon: Dribbble, href: '#', label: 'Dribbble', color: 'hover:text-pink-400 hover:bg-pink-400/10' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600 hover:bg-blue-600/10' },
  ];

  const quickLinks = [
    { key: 'home', path: '/' },
    { key: 'portfolio', path: '/portfolio' },
    { key: 'packages', path: '/packages' },
    { key: 'contact', path: '/contact' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/80 via-muted/50 to-transparent" />

      {/* Main Footer Content */}
      <div className="relative border-t border-border/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand Section */}
            <div className="space-y-6">
              <Link to="/" className="inline-flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-primary/30 transition-shadow duration-300">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-gradient-static">Design</span>
                  <span className="text-foreground">Pulse</span>
                </span>
              </Link>
              <p className="text-muted-foreground leading-relaxed max-w-xs">
                {language === 'ar'
                  ? 'نحول أفكارك إلى تصاميم إبداعية تجذب الانتباه وتترك انطباعاً لا يُنسى'
                  : 'Transforming your ideas into creative designs that captivate and leave lasting impressions'}
              </p>

              {/* Certification Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {language === 'ar'
                    ? 'معتمد من Lumina Ai Academy'
                    : 'Certified by Lumina Ai Academy'}
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-foreground">
                {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <nav className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.key}
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span>{t(link.key)}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social & Contact */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-foreground">
                {language === 'ar' ? 'تابعني' : 'Follow Me'}
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>viptayam@gmail.com</p>
                <p>+20 102 206 5189</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-sm text-muted-foreground text-center md:text-start">
                © {currentYear}{' '}
                {language === 'ar'
                  ? 'جميع الحقوق محفوظة - Design Pulse'
                  : 'All rights reserved - Design Pulse'}
              </p>

              {/* Made with Love */}
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                {language === 'ar' ? 'صنع بـ' : 'Made with'}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </motion.span>
                {language === 'ar' ? 'في مصر' : 'in Egypt'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;