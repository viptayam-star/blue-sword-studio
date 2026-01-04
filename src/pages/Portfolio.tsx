import React, { useState, useMemo, memo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Sparkles, Grid3X3, LayoutGrid, Layers } from 'lucide-react';
import ImageWithWatermark from '@/components/ImageWithWatermark';

// Import portfolio images
import sevenUpAd from '@/assets/portfolio/7up-ad.png';
import graphicDesignBg from '@/assets/portfolio/graphic-design-bg.jpeg';
import hgLogoBlack from '@/assets/portfolio/hg-logo-black.png';
import hgLogoYellow from '@/assets/portfolio/hg-logo-yellow.png';
import buffaloburger from '@/assets/portfolio/buffalo-burger.jpg';
import burgerAd from '@/assets/portfolio/burger-ad.png';
import tigerChips from '@/assets/portfolio/tiger-chips.png';
import coffeeAd from '@/assets/portfolio/coffee-ad.jpg';
import copaCaffe3d from '@/assets/portfolio/copa-caffe-3d.jpeg';
import hanyGalalJewelry from '@/assets/portfolio/hany-galal-jewelry.png';
import hgStoreBlack from '@/assets/portfolio/hg-store-logo-black.png';
import hgStoreWhite from '@/assets/portfolio/hg-store-logo-white.png';
import hgStorePink from '@/assets/portfolio/hg-store-logo-pink.png';
import hgJewelryAlt from '@/assets/portfolio/hg-jewelry-alt.png';
import hndRestaurant3d from '@/assets/portfolio/hnd-restaurant-3d.jpeg';
import hendDesertAd from '@/assets/portfolio/hend-desert-ad.png';
import photoshopTitoLogo from '@/assets/portfolio/photoshop-tito-logo.jpg';
import youtubeLogoDesign from '@/assets/portfolio/youtube-logo-design.png';
import juhaynaMangoAd from '@/assets/portfolio/juhayna-mango-ad.jpg';
import juhaynaTvCommercial from '@/assets/portfolio/juhayna-tv-commercial.jpg';
import dermaProduct from '@/assets/portfolio/derma-product.png';
import porsche911 from '@/assets/portfolio/porsche-911.png';
import pizzaTime from '@/assets/portfolio/pizza-time.png';
import burgerPromo from '@/assets/portfolio/burger-promo.png';
import chickenMenu from '@/assets/portfolio/chicken-menu.jpg';
import cranberryJuice from '@/assets/portfolio/cranberry-juice.png';
import decworLogo from '@/assets/portfolio/decwor-logo.png';
import dermaLogo from '@/assets/portfolio/derma-logo.png';
import pizzaDelicious from '@/assets/portfolio/pizza-delicious.png';
import fastFoodMenu from '@/assets/portfolio/fast-food-menu.png';
import pizzaElKing from '@/assets/portfolio/pizza-el-king.png';
import saladAd from '@/assets/portfolio/salad-ad.png';
import siroInternet from '@/assets/portfolio/siro-hadoum-internet.png';
import ferrariDesign from '@/assets/portfolio/ferrari-design.png';
import perfumeDesign from '@/assets/portfolio/perfume-design.png';

const Portfolio = memo(() => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = useMemo(() => [
    { key: 'all', label: t('allWorks'), icon: Grid3X3 },
    { key: 'logos', label: t('logos'), icon: Sparkles },
    { key: 'social', label: t('socialMedia'), icon: LayoutGrid },
    { key: 'branding', label: t('branding'), icon: Layers },
  ], [t]);

  const portfolioItems = useMemo(() => [
    { id: 1, title: 'HG Jewelry Logo - Black Version', category: 'logos', image: hgLogoBlack, description: 'Elegant jewelry brand logo' },
    { id: 2, title: 'HG Jewelry Logo - Gold Version', category: 'logos', image: hgLogoYellow, description: 'Premium jewelry brand identity' },
    { id: 3, title: 'Hany Galal Jewelry Logo', category: 'logos', image: hanyGalalJewelry, description: 'Minimalist luxury jewelry brand logo' },
    { id: 4, title: 'HG Store Logo - Black Version', category: 'logos', image: hgStoreBlack, description: 'Modern store logo design' },
    { id: 5, title: 'HG Store Logo - White Version', category: 'logos', image: hgStoreWhite, description: 'Clean store logo with jewelry elements' },
    { id: 6, title: 'HG Store Logo - Pink Version', category: 'logos', image: hgStorePink, description: 'Vibrant pink version of HG Store logo' },
    { id: 7, title: 'HG Jewelry Alternative Logo', category: 'logos', image: hgJewelryAlt, description: 'Alternative version of Hany Galal Jewelry logo' },
    { id: 8, title: 'Photoshop Tito Logo', category: 'logos', image: photoshopTitoLogo, description: 'Creative logo design featuring planet and gaming elements' },
    { id: 9, title: 'YouTube Logo Design', category: 'logos', image: youtubeLogoDesign, description: 'YouTube logo with artistic brush stroke effect' },
    { id: 10, title: '7UP Creative Advertisement', category: 'social', image: sevenUpAd, description: 'Creative social media advertisement' },
    { id: 11, title: 'Buffalo Burger Advertisement', category: 'social', image: buffaloburger, description: 'Eye-catching burger advertisement' },
    { id: 12, title: 'Burger Restaurant Promotion', category: 'social', image: burgerAd, description: 'Professional burger restaurant advertisement' },
    { id: 13, title: 'Tiger Chips Product Design', category: 'social', image: tigerChips, description: 'Dynamic chips packaging advertisement' },
    { id: 14, title: 'Coffee Advertisement', category: 'social', image: coffeeAd, description: 'Premium coffee advertisement' },
    { id: 15, title: 'Juhayna Mango Advertisement', category: 'social', image: juhaynaMangoAd, description: 'Creative Arabic mango juice advertisement' },
    { id: 16, title: 'Juhayna TV Commercial', category: 'social', image: juhaynaTvCommercial, description: 'Professional TV commercial mockup' },
    { id: 17, title: 'HEND Desert Surreal Advertisement', category: 'social', image: hendDesertAd, description: 'Surreal advertisement featuring giant food container' },
    { id: 18, title: 'Copa Caffe 3D Visualization', category: 'branding', image: copaCaffe3d, description: '3D architectural visualization of Copa Caffe' },
    { id: 19, title: 'HND Restaurant 3D Design', category: 'branding', image: hndRestaurant3d, description: '3D restaurant design and branding' },
    { id: 20, title: 'Graphic Design Illustration', category: 'branding', image: graphicDesignBg, description: 'Creative graphic design illustration' },
    { id: 21, title: 'DERMA Skincare Product', category: 'social', image: dermaProduct, description: 'Social media post for DERMA skincare' },
    { id: 22, title: 'Porsche 911 Design', category: 'social', image: porsche911, description: 'Minimalist automotive design' },
    { id: 23, title: 'Pizza Time Promotion', category: 'social', image: pizzaTime, description: 'Fun and creative Pizza Hut promotion' },
    { id: 24, title: 'Burger Restaurant Promotion', category: 'social', image: burgerPromo, description: 'Delicious burger advertisement' },
    { id: 25, title: 'Chicken Restaurant Menu', category: 'social', image: chickenMenu, description: 'Arabic restaurant menu design' },
    { id: 26, title: 'Cranberry Juice Advertisement', category: 'social', image: cranberryJuice, description: 'Modern beverage advertisement' },
    { id: 27, title: 'DECWOR Home Decor Logo', category: 'logos', image: decworLogo, description: 'Home decoration company logo' },
    { id: 28, title: 'DERMA Skincare Logo', category: 'logos', image: dermaLogo, description: 'Elegant skincare brand logo' },
    { id: 29, title: 'Super Delicious Pizza', category: 'social', image: pizzaDelicious, description: 'Appetizing pizza advertisement' },
    { id: 30, title: 'Fast Food Menu Design', category: 'social', image: fastFoodMenu, description: 'Professional fast food menu' },
    { id: 31, title: 'Pizza El King Promotion', category: 'social', image: pizzaElKing, description: 'Pizza promotion with discount offer' },
    { id: 32, title: 'Fresh Salad Advertisement', category: 'social', image: saladAd, description: 'Fresh salad advertisement' },
    { id: 33, title: 'Siro Internet Service Advertisement', category: 'social', image: siroInternet, description: 'Creative internet service advertisement' },
    { id: 34, title: 'Ferrari Racing Design', category: 'social', image: ferrariDesign, description: 'Creative Ferrari racing design' },
    { id: 35, title: 'GRD Royal Perfume', category: 'branding', image: perfumeDesign, description: 'Luxury perfume product design' },
  ], []);

  const filteredItems = useMemo(() =>
    activeFilter === 'all'
      ? portfolioItems
      : portfolioItems.filter(item => item.category === activeFilter),
    [activeFilter, portfolioItems]
  );

  const getBentoClass = (index: number) => {
    if (activeFilter === 'all' && index === 0) return 'md:col-span-2 md:row-span-2';
    if (activeFilter === 'all' && index === 1) return 'md:row-span-2';
    return '';
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/3 -right-32 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-glow mb-6 inline-flex">
            <Sparkles className="w-4 h-4" />
            {language === 'ar' ? 'أعمالي المميزة' : 'Featured Works'}
          </span>

          <h1 className="heading-lg text-foreground mb-6">
            {t('portfolioTitle')}
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('portfolioSubtitle')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.key}
                variant={activeFilter === filter.key ? 'default' : 'outline'}
                onClick={() => setActiveFilter(filter.key)}
                className={`relative overflow-hidden px-6 py-5 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'btn-gradient text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card/50 border-border/50 hover:border-primary/30 hover:bg-card backdrop-blur-sm'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Portfolio Stats */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center">
            <span className="text-3xl font-bold text-gradient">{filteredItems.length}</span>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'مشروع' : 'Projects'}
            </p>
          </div>
          <div className="w-px bg-border/50" />
          <div className="text-center">
            <span className="text-3xl font-bold text-gradient">
              {new Set(portfolioItems.map(i => i.category)).size}
            </span>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'تصنيفات' : 'Categories'}
            </p>
          </div>
        </div>

        {/* Portfolio Grid - Simple Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={getBentoClass(index)}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer h-full">
                    <div className="relative h-full bg-card rounded-2xl overflow-hidden border border-border/30 group hover:border-primary/30 transition-all duration-500">
                      {/* Image */}
                      <div className="absolute inset-0 bg-muted">
                        <ImageWithWatermark
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        />
                      </div>

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground border border-border/50">
                          {filters.find(f => f.key === item.category)?.label}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                        <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.description}
                        </p>
                      </div>

                      {/* Hover Glow */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-5xl bg-card/95 backdrop-blur-xl border-border/30 p-0 overflow-hidden">
                  <VisuallyHidden>
                    <DialogTitle>{item.title}</DialogTitle>
                  </VisuallyHidden>
                  <div className="grid md:grid-cols-2">
                    {/* Image Side */}
                    <div className="aspect-square md:aspect-auto bg-muted relative overflow-hidden">
                      <ImageWithWatermark
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20" />
                    </div>

                    {/* Content Side */}
                    <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                      <div>
                        <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold inline-flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          {filters.find(f => f.key === item.category)?.label}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                        {item.title}
                      </h2>

                      <p className="text-muted-foreground text-lg leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-primary" />
                            </div>
                            {language === 'ar' ? 'تصميم احترافي' : 'Professional Design'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              {language === 'ar' ? 'لا توجد مشاريع في هذا التصنيف' : 'No projects in this category'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

Portfolio.displayName = 'Portfolio';

export default Portfolio;
