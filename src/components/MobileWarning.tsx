import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const MobileWarning = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem('mobileWarningDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Check if mobile/tablet
    const checkDevice = () => {
      const isMobile = window.innerWidth < 1024;
      setIsVisible(isMobile && !isDismissed);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem('mobileWarningDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm"
      >
        <div className="relative bg-card border border-border rounded-xl p-4 shadow-2xl backdrop-blur-lg">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-primary" />
            </div>
            
            <div className="flex-1 pr-4">
              <h4 className="font-semibold text-foreground text-sm mb-1">
                {language === 'ar' ? 'للتجربة الأفضل' : 'For Best Experience'}
              </h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {language === 'ar' 
                  ? 'استخدم الموقع على الكمبيوتر للاستمتاع بكافة التفاعلات والتأثيرات البصرية'
                  : 'Use the website on a computer to enjoy all interactions and visual effects'
                }
              </p>
            </div>
          </div>
          
          <Button
            onClick={handleDismiss}
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-xs"
          >
            {language === 'ar' ? 'فهمت، متابعة' : 'Got it, continue'}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileWarning;
