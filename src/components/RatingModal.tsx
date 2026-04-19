import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import sound5Stars from '@/assets/rating-5stars.mp3';
import soundLow from '@/assets/rating-low.mp3';

const RatingModal = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 10000);

    return () => {
      clearTimeout(timer);

      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
      }
    };
  }, []);

  const resetModalState = () => {
    setOpen(false);
    setSelected(0);
    setHovered(0);
    setIsSubmitting(false);
  };

  const handleSelect = (rating: number) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSelected(rating);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(rating === 5 ? sound5Stars : soundLow);
    audioRef.current = audio;

    audio.onended = () => {
      audioRef.current = null;
    };

    audio.onerror = () => {
      audioRef.current = null;
      setIsSubmitting(false);
    };

    audio.play().catch(() => {
      audioRef.current = null;
      setIsSubmitting(false);
    });

    closeTimerRef.current = setTimeout(() => {
      resetModalState();
    }, 600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={resetModalState}
          />

          <motion.div
            className="relative z-10 w-full max-w-md rounded-3xl bg-card border border-border/50 shadow-2xl p-8 md:p-10"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <button
              onClick={resetModalState}
              className="absolute top-4 end-4 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center"
              >
                <Star className="w-8 h-8 text-primary fill-primary" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {isRTL ? 'قيّم تجربتك' : 'Rate Your Experience'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {isRTL
                  ? 'رأيك يهمنا، اختر عدد النجوم'
                  : 'Your opinion matters, pick a star rating'}
              </p>

              <div className="flex items-center justify-center gap-2 md:gap-3" dir="ltr">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hovered || selected) >= star;
                  return (
                    <motion.button
                      key={star}
                      type="button"
                      onMouseEnter={() => !isSubmitting && setHovered(star)}
                      onMouseLeave={() => !isSubmitting && setHovered(0)}
                      onClick={() => handleSelect(star)}
                      whileHover={isSubmitting ? undefined : { scale: 1.15 }}
                      whileTap={isSubmitting ? undefined : { scale: 0.95 }}
                      animate={selected === star ? { scale: [1, 1.4, 1] } : {}}
                      transition={{ duration: 0.4 }}
                      className="p-1 focus:outline-none disabled:pointer-events-none disabled:opacity-70"
                      aria-label={`${star} stars`}
                      disabled={isSubmitting}
                    >
                      <Star
                        className={`w-10 h-10 md:w-12 md:h-12 transition-colors duration-200 ${
                          active
                            ? 'text-primary fill-primary'
                            : 'text-muted-foreground/40'
                        }`}
                        strokeWidth={1.5}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RatingModal;