import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useLanguage } from '../../i18n/LanguageContext';
import { Button } from '../ui/Button';
import { scrollToCategories } from '../../utils/scrollTo';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1550547347-06eea5a72d1e?w=1920&q=80&auto=format&fit=crop';

function HeroComponent() {
  const { t } = useLanguage();

  const handleBrowseMenu = () => {
    scrollToCategories(120);
  };

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden sm:min-h-[78vh]">
      <img
        src={HERO_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-zinc-950" />

      <motion.div
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 text-center sm:px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <motion.img
          src={logo}
          alt={`${t.restaurantName} logo`}
          className="mb-5 h-28 w-28 rounded-full object-cover amber-glow sm:mb-6 sm:h-36 sm:w-36"
          width={144}
          height={144}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        />

        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-4xl">
          {t.restaurantName}
        </h2>

        <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-amber-700 sm:text-base">
          {t.slogan}
        </p>

        <p className="mb-8 max-w-md text-sm leading-relaxed text-zinc-300 sm:mb-10 sm:text-base">
          {t.heroSubtitle}
        </p>

        <Button size="lg" onClick={handleBrowseMenu} className="min-h-[48px] min-w-[200px]">
          {t.browseMenu}
          <ChevronDown className="h-5 w-5" />
        </Button>
      </motion.div>
    </section>
  );
}

export const Hero = memo(HeroComponent);
