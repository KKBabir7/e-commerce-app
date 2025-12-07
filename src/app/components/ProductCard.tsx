'use client';

import Image from 'next/image';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { ProductCardProps } from '../types/product';
import Button from './ui/Button';

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    console.log('Added to cart:', product.title);
    // Implement cart functionality here
  };

  const handleWishlist = () => {
    console.log('Added to wishlist:', product.title);
    // Implement wishlist functionality here
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {/* Using img tag instead of Next Image since we don't have all domains configured */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
        >
          <FiHeart className="text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-[10px] md:text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded capitalize">
            {product.category.replace("'s", "'s ")}
          </span>
        </div>
        
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <FiStar className="text-yellow-400 fill-yellow-400" size={16} />
            <span className="ml-1 text-sm font-medium">{product.rating.rate}</span>
            <span className="text-sm text-gray-500 ml-1">
              ({product.rating.count})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 flex-col sm:flex-row">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            className="flex items-center rounded-0"
          >
            <FiShoppingCart className="mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}