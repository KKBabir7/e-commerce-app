'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Button from './ui/Button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const heroSlides = [
  {
    id: 1,
    title: "Shop Computer & Experience",
    description: "You Cannot Inspect Quality Into The Product: It is Already There. I Am Not A Product Of My Circumstances. I Am A Product Of My Decisions.",
    buttonText: "View More",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Premium Electronics",
    description: "Discover the latest technology and innovative gadgets that will transform your daily life and work experience.",
    buttonText: "Explore Now",
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Smart Home Solutions",
    description: "Transform your living space with intelligent devices that make your home more comfortable, secure, and efficient.",
    buttonText: "Shop Smart Home",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  }
];

export default function HeroSlider() {
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3 !mx-1',
          bulletActiveClass: '!bg-white'
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        grabCursor={true}
        className="h-full"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-no-repeat  bg-center transition-transform duration-1000"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              
              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl text-white"
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-[#14B1F0]">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                      {slide.description}
                    </p>
                    <Button 
                      variant="primary" 
                      size="lg"
                      className="bg-[#14B1F0] text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
                    >
                      {slide.buttonText}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="hero-prev absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200">
        <FiChevronLeft className="text-white text-2xl" />
      </button>
      <button className="hero-next absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200">
        <FiChevronRight className="text-white text-2xl" />
      </button>

      {/* Gradient Overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  );
}