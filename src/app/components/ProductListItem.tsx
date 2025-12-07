'use client';

import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { ProductCardProps } from '../types/product';
import Button from './ui/Button';

export default function ProductListItem({ product }: ProductCardProps) {
  const handleAddToCart = () => {
    console.log('Added to cart:', product.title);
  };

  const handleWishlist = () => {
    console.log('Added to wishlist:', product.title);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <div className="md:w-48 h-48 bg-gray-100 flex-shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between">
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded capitalize">
                {product.category.replace("'s", "'s ")}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {product.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <FiStar className="text-yellow-400 fill-yellow-400" size={16} />
                <span className="ml-1 text-sm font-medium">{product.rating.rate}</span>
                <span className="text-sm text-gray-500 ml-1">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddToCart}
                  className="flex items-center"
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </Button>
                
                <button
                  onClick={handleWishlist}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FiHeart className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 md:mt-0 md:ml-6">
            <div className="text-sm text-gray-500 space-y-2">
              <div className="flex items-center">
                <span className="w-24">Availability:</span>
                <span className="text-green-600 font-medium">In Stock</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Free Shipping:</span>
                <span className="text-green-600 font-medium">Yes</span>
              </div>
              <div className="flex items-center">
                <span className="w-24">Delivery:</span>
                <span className="font-medium">1-2 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}