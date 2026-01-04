import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Star, Sparkles, Crown, Zap, ArrowLeft, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';

const Packages = () => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar';

  const packages = [
    {
      id: 'weekly',
      name: language === 'ar' ? 'الباقة الأسبوعية' : 'Weekly Package',
      subtitle: language === 'ar' ? 'للبدايات السريعة' : 'Quick Start',
      price: '1,000',
      currency: language === 'ar' ? 'جنيه' : 'EGP',
      period: language === 'ar' ? '/أسبوع' : '/week',
      icon: Zap,
      features: [
        language === 'ar' ? 'تصاميم سوشيال ميديا' : 'Social Media Designs',
        language === 'ar' ? 'تغطية أسبوعية كاملة' : 'Full Week Coverage',
        language === 'ar' ? 'تصاميم احترافية' : 'Professional Designs',
        language === 'ar' ? 'تسليم سريع' : 'Fast Delivery',
      ],
      popular: false,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'monthly',
      name: language === 'ar' ? 'الباقة الشهرية' : 'Monthly Package',
      subtitle: language === 'ar' ? 'الأكثر طلباً' : 'Most Popular',
      price: '10,000',
      currency: language === 'ar' ? 'جنيه' : 'EGP',
      period: language === 'ar' ? '/شهر' : '/month',
      icon: Crown,
      features: [
        language === 'ar' ? 'تصاميم شهرية متكاملة' : 'Complete Monthly Designs',
        language === 'ar' ? 'محتوى سوشيال ميديا' : 'Social Media Content',
        language === 'ar' ? 'تصميم إعلانات' : 'Ad Designs',
        language === 'ar' ? 'دعم فني مستمر' : 'Continuous Support',
        language === 'ar' ? 'مراجعات مفتوحة' : 'Unlimited Revisions',
      ],
      popular: true,
      gradient: 'from-primary/30 to-accent/30',
      iconBg: 'from-primary to-accent',
    },
    {
      id: 'yearly',
      name: language === 'ar' ? 'الباقة السنوية' : 'Yearly Package',
      subtitle: language === 'ar' ? 'أفضل قيمة' : 'Best Value',
      price: '18,500',
      currency: language === 'ar' ? 'جنيه' : 'EGP',
      period: language === 'ar' ? '/سنة' : '/year',
      originalPrice: '20,000',
      discount: '7.5%',
      icon: Star,
      features: [
        language === 'ar' ? 'تغطية سنوية كاملة' : 'Full Year Coverage',
        language === 'ar' ? 'هوية بصرية متكاملة' : 'Complete Brand Identity',
        language === 'ar' ? 'محتوى شهري منتظم' : 'Regular Monthly Content',
        language === 'ar' ? 'حملات إعلانية' : 'Marketing Campaigns',
        language === 'ar' ? 'أولوية في التنفيذ' : 'Priority Execution',
        language === 'ar' ? 'خصم 7.5%' : '7.5% Discount',
      ],
      popular: false,
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconBg: 'from-amber-500 to-orange-500',
    },
  ];

  const handleContact = (packageName: string) => {
    const phoneNumber = '201022065189';
    const message =
      language === 'ar'
        ? `مرحباً، أريد الاستفسار عن ${packageName}`
        : `Hello, I would like to inquire about the ${packageName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh opacity-40" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-glow mb-6 inline-flex"
            >
              <Sparkles className="w-4 h-4" />
              {language === 'ar' ? 'باقات التصميم' : 'Design Packages'}
            </motion.span>
            <h1 className="heading-lg text-foreground mb-6">{t('packagesTitle')}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('packagesSubtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {packages.map((pkg, index) => (
            <ScrollReveal key={pkg.id} delay={index * 0.15}>
              <motion.div
                className={`relative group ${pkg.popular ? 'lg:-mt-8' : ''}`}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
                  >
                    <span className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold shadow-lg shadow-primary/30 flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      {language === 'ar' ? 'الأكثر طلباً' : 'Most Popular'}
                    </span>
                  </motion.div>
                )}

                {/* Discount Badge */}
                {pkg.discount && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute -top-3 -right-3 z-20"
                  >
                    <span className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xs font-bold flex items-center justify-center shadow-lg transform rotate-12">
                      -{pkg.discount}
                    </span>
                  </motion.div>
                )}

                {/* Card */}
                <div
                  className={`relative rounded-3xl p-8 transition-all duration-500 ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-card via-card to-primary/5 border-2 border-primary/30 shadow-2xl shadow-primary/10'
                      : 'bg-card border border-border/50 hover:border-primary/20'
                  }`}
                >
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Glow Effect for Popular */}
                  {pkg.popular && (
                    <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-xl -z-10" />
                  )}

                  <div className="relative z-10">
                    {/* Package Icon */}
                    <div className="mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pkg.iconBg} flex items-center justify-center shadow-lg`}
                      >
                        <pkg.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Package Header */}
                    <div className="mb-8">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {pkg.subtitle}
                      </p>
                      <h3 className="text-2xl font-bold text-foreground mb-4">{pkg.name}</h3>

                      {/* Price */}
                      <div className="flex items-baseline gap-2">
                        {pkg.originalPrice && (
                          <span className="text-xl text-muted-foreground line-through">
                            {pkg.originalPrice}
                          </span>
                        )}
                        <span
                          className={`text-5xl font-bold ${pkg.popular ? 'text-gradient' : 'text-foreground'}`}
                        >
                          {pkg.price}
                        </span>
                        <span className="text-lg text-muted-foreground">
                          {pkg.currency}
                          <span className="text-sm">{pkg.period}</span>
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3"
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              pkg.popular
                                ? 'bg-primary/20 text-primary'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <Check className="w-4 h-4" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <MagneticButton>
                      <Button
                        onClick={() => handleContact(pkg.name)}
                        className={`w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                          pkg.popular
                            ? 'btn-gradient text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40'
                            : 'btn-outline-glow'
                        }`}
                        variant={pkg.popular ? 'default' : 'outline'}
                        size="lg"
                      >
                        <span className="flex items-center justify-center gap-2">
                          {language === 'ar' ? 'تواصل الآن' : 'Get Started'}
                          {isRTL ? (
                            <ArrowLeft className="w-5 h-5" />
                          ) : (
                            <ArrowRight className="w-5 h-5" />
                          )}
                        </span>
                      </Button>
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={0.5}>
          <div className="text-center mt-20">
            <p className="text-muted-foreground mb-4">
              {language === 'ar'
                ? 'هل تحتاج باقة مخصصة؟'
                : 'Need a custom package?'}
            </p>
            <Button
              variant="link"
              onClick={() => handleContact(language === 'ar' ? 'باقة مخصصة' : 'Custom Package')}
              className="text-primary hover:text-primary/80 text-lg font-semibold"
            >
              {language === 'ar' ? 'تواصل معنا لمناقشة احتياجاتك' : 'Contact us to discuss your needs'}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Packages;