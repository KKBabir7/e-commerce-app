'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiGrid, FiShoppingBag, FiHome, FiHeart, FiMonitor, FiWatch } from 'react-icons/fi';
import Link from 'next/link';
import { getCategories } from '../actions/products';

interface Category {
  id: number;
  name: string;
}

interface CategoryItem {
  id: number;
  name: string;
  displayName: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  borderColor: string;
  tagline: string;
  apiCategoryName: string;
}

export default function CategorySection() {
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Map API categories to display data
  const getCategoryDisplayData = (categoryName: string, categoryId: number) => {
    switch(categoryName) {
      case 'electronics':
        return {
          displayName: 'Electronics',
          icon: <FiMonitor className="w-12 h-12" />,
          color: 'bg-blue-50',
          textColor: 'text-blue-600',
          borderColor: 'border-blue-200',
          tagline: 'Shop'
        };
      case 'jewelery':
        return {
          displayName: 'Jewelery',
          icon: <FiHeart className="w-12 h-12" />,
          color: 'bg-purple-50',
          textColor: 'text-purple-600',
          borderColor: 'border-purple-200',
          tagline: 'Shop'
        };
      case "men's clothing":
        return {
          displayName: 'Fashion',
          icon: <FiShoppingBag className="w-12 h-12" />,
          color: 'bg-green-50',
          textColor: 'text-green-600',
          borderColor: 'border-green-200',
          tagline: 'Shop'
        };
      case "women's clothing":
        return {
          displayName: 'Appliances',
          icon: <FiHome className="w-12 h-12" />,
          color: 'bg-pink-50',
          textColor: 'text-pink-600',
          borderColor: 'border-pink-200',
          tagline: 'Shop'
        };
      default:
        return {
          displayName: categoryName,
          icon: <FiGrid className="w-12 h-12" />,
          color: 'bg-gray-50',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200',
          tagline: 'Shop'
        };
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      
      // Transform API categories to display items
      const items = cats.map(cat => {
        const displayData = getCategoryDisplayData(cat.name, cat.id);
        return {
          id: cat.id,
          name: displayData.displayName,
          displayName: displayData.displayName,
          icon: displayData.icon,
          color: displayData.color,
          textColor: displayData.textColor,
          borderColor: displayData.borderColor,
          tagline: displayData.tagline,
          apiCategoryName: cat.name // Store the actual API category name
        };
      });
      
      // Add Babies Store if not in API (for design matching)

      
      setCategoryItems(items);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === categoryItems.length - 1 ? 0 : prevIndex + 1
    );
  }, [categoryItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? categoryItems.length - 1 : prevIndex - 1
    );
  }, [categoryItems.length]);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;
    
    if (deltaX > 50) {
      // Swipe right - go to previous
      prevSlide();
      setIsDragging(false);
    } else if (deltaX < -50) {
      // Swipe left - go to next
      nextSlide();
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Calculate visible slides based on screen size
  const getVisibleSlides = () => {
    if (typeof window === 'undefined') return 4;
    
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    return 4;
  };

  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    const updateVisibleSlides = () => {
      setVisibleSlides(getVisibleSlides());
    };
    
    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);
    
    return () => {
      window.removeEventListener('resize', updateVisibleSlides);
    };
  }, []);

  if (categoryItems.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        
        
        <div className="relative">
          {/* Navigation Buttons */}
        

         
         <div className="overflow-hidden px-0">

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 py-2">
    {categoryItems.map((category, index) => (
      <div
        key={category.id}
        className="px-1"
      >
        <Link 
          href={
            category.apiCategoryName === 'all' 
              ? '/category/all' 
              : category.displayName === 'Fashion'
              ? '/category/fashion'
              : category.displayName === 'Appliances'
              ? '/category/appliances'
              : category.displayName === 'Babies Store'
              ? '/category/babies-store'
              : `/category/${category.displayName.toLowerCase()}`
          }
          className="block"
        >
          <div
            className={`${category.color} ${category.borderColor} 
            border-2 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 
            h-full flex flex-col items-center justify-center cursor-pointer group`}
          >
            {/* Icon */}
            <div 
              className={`w-10 md:w-28 h-10 md:h-28 ${category.color} ${category.borderColor} 
              border-4 rounded-full flex items-center justify-center mb-6 
              group-hover:scale-110 transition-transform duration-300`}
            >
              <div className={`${category.textColor} text-4xl`}>
                {category.icon}
              </div>
            </div>
            
            {/* Name */}
            <h3 
              className={`text-xl md:text-2xl font-bold ${category.textColor} mb-3 text-center`}
            >
              {category.displayName}
            </h3>
            
            {/* Button */}
            <div
              className={`mt-4 ${category.textColor} ${category.borderColor} 
              border-2 bg-white hover:bg-gray-50 px-4 md:px-8 py-2 md:py-3 rounded-xl font-semibold 
              text-lg transition-all duration-300 group-hover:px-10`}
            >
              {category.tagline}
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>

</div>


         
        
        </div>

      
      </div>
    </section>
  );
}