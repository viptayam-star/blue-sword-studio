import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    portfolio: 'الأعمال',
    packages: 'الباقات',
    contact: 'التواصل',
    auth: 'تسجيل الدخول',
    
    // Home page
    welcome: 'مرحباً، أنا مصمم جرافيك',
    heroSubtitle: 'متخصص في الشعارات والهويات البصرية',
    viewPortfolio: 'عرض الأعمال',
    
    // Portfolio page
    portfolioTitle: 'أعمالي',
    portfolioSubtitle: 'مجموعة من أفضل أعمالي في التصميم الجرافيكي',
    allWorks: 'جميع الأعمال',
    logos: 'شعارات',
    socialMedia: 'سوشيال ميديا',
    branding: 'هوية بصرية',
    
    // Packages page
    packagesTitle: 'باقات التصميم',
    packagesSubtitle: 'اختر الباقة التي تناسب احتياجاتك',
    basic: 'أساسية',
    standard: 'متوسطة',
    premium: 'متقدمة',
    orderNow: 'اطلب الآن',
    mostPopular: 'الأكثر شيوعاً',
    
    // Contact page
    contactTitle: 'تواصل معي',
    contactSubtitle: 'دعنا نناقش مشروعك القادم',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    send: 'إرسال',
    phone: 'الهاتف',
    
    // Theme
    darkMode: 'الوضع المظلم',
    lightMode: 'الوضع المضيء',
  },
  
  en: {
    // Navigation
    home: 'Home',
    portfolio: 'Portfolio',
    packages: 'Packages',
    contact: 'Contact',
    auth: 'Sign In',
    
    // Home page
    welcome: 'Hello, I\'m a Graphic Designer',
    heroSubtitle: 'Specialized in logos and visual identity',
    viewPortfolio: 'View Portfolio',
    
    // Portfolio page
    portfolioTitle: 'My Work',
    portfolioSubtitle: 'A collection of my best graphic design work',
    allWorks: 'All Works',
    logos: 'Logos',
    socialMedia: 'Social Media',
    branding: 'Branding',
    
    // Packages page
    packagesTitle: 'Design Packages',
    packagesSubtitle: 'Choose the package that fits your needs',
    basic: 'Basic',
    standard: 'Standard',
    premium: 'Premium',
    orderNow: 'Order Now',
    mostPopular: 'Most Popular',
    
    // Contact page
    contactTitle: 'Contact Me',
    contactSubtitle: 'Let\'s discuss your next project',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send',
    phone: 'Phone',
    
    // Theme
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };
  
  // Update document direction and lang
  React.useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);
  
  return (
    <LanguageContext.Provider value={{ language, direction, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};