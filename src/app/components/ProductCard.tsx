// 'use client';

// import Image from 'next/image';
// import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
// import { ProductCardProps } from '../types/product';
// import Button from './ui/Button';

// export default function ProductCard({ product }: ProductCardProps) {
//   const handleAddToCart = () => {
//     console.log('Added to cart:', product.title);
//     // Implement cart functionality here
//   };

//   const handleWishlist = () => {
//     console.log('Added to wishlist:', product.title);
//     // Implement wishlist functionality here
//   };

//   return (
//     <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
//       {/* Product Image */}
//       <div className="relative h-48 bg-gray-100">
//         {/* Using img tag instead of Next Image since we don't have all domains configured */}
//         <img
//           src={product.image}
//           alt={product.title}
//           className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
//         />
//         {/* Wishlist Button */}
//         <button
//           onClick={handleWishlist}
//           className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
//         >
//           <FiHeart className="text-gray-600" />
//         </button>
//       </div>

//       {/* Product Info */}
//       <div className="p-4">
//         <div className="mb-2">
//           <span className="text-[10px] md:text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded capitalize">
//             {product.category.replace("'s", "'s ")}
//           </span>
//         </div>
        
//         <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 h-12">
//           {product.title}
//         </h3>
        
//         <div className="flex items-center mb-3">
//           <div className="flex items-center">
//             <FiStar className="text-yellow-400 fill-yellow-400" size={16} />
//             <span className="ml-1 text-sm font-medium">{product.rating.rate}</span>
//             <span className="text-sm text-gray-500 ml-1">
//               ({product.rating.count})
//             </span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between gap-2 flex-col sm:flex-row">
//           <div>
//             <span className="text-xl font-bold text-gray-900">
//               ${product.price.toFixed(2)}
//             </span>
//           </div>
          
//           <Button
//             variant="primary"
//             size="sm"
//             onClick={handleAddToCart}
//             className="flex items-center rounded-0"
//           >
//             <FiShoppingCart className="mr-2" />
//             Add
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/components/ProductCard.tsx
'use client';

import { useState, useEffect } from 'react';
import { FiShoppingCart, FiHeart, FiStar, FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { ProductCardProps } from '../types/product';
import Button from './ui/Button';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [isAdding, setIsAdding] = useState(false);
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // This ensures we only run cart-related logic on the client side
  useEffect(() => {
    setIsMounted(true);
    // Check if product is in cart on mount
    if (isInCart(product.id)) {
      setShowQuantityControls(true);
    }
  }, [product.id, isInCart]);

  const handleAddToCart = () => {
    if (!isInCart(product.id)) {
      setIsAdding(true);
      addToCart(product);
      
      // Show success animation
      setTimeout(() => {
        setIsAdding(false);
        setShowQuantityControls(true);
      }, 500);
    } else {
      setShowQuantityControls(true);
    }
  };

  const handleIncreaseQuantity = () => {
    const currentQuantity = getItemQuantity(product.id);
    updateQuantity(product.id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity > 1) {
      updateQuantity(product.id, currentQuantity - 1);
    } else {
      updateQuantity(product.id, 0);
      setShowQuantityControls(false);
    }
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isProductInCart = isMounted ? isInCart(product.id) : false;
  const quantityInCart = isMounted ? getItemQuantity(product.id) : 0;
  const isProductInWishlist = isMounted ? isInWishlist(product.id) : false;

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Button - Client only */}
        {isMounted && (
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
              isProductInWishlist ? 'bg-red-50 text-red-600' : 'bg-white hover:bg-gray-50 text-gray-600'
            }`}
          >
            <FiHeart className={isProductInWishlist ? 'fill-red-600' : ''} />
          </button>
        )}

        {/* In Cart Badge - Client only */}
        {isMounted && isProductInCart && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              In Cart ({quantityInCart})
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded capitalize">
            {product.category.replace("'s", "'s ")}
          </span>
        </div>
        
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">
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

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          {/* Cart Button with Quantity Controls - Client only */}
          {isMounted ? (
            showQuantityControls ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecreaseQuantity}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <FiMinus size={16} />
                </button>
                <span className="font-medium">{quantityInCart}</span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <FiPlus size={16} />
                </button>
              </div>
            ) : (
              <Button
                variant={isProductInCart ? "secondary" : "primary"}
                size="sm"
                onClick={handleAddToCart}
                className="flex items-center min-w-[90px] justify-center"
                disabled={isAdding}
              >
                {isAdding ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Adding
                  </div>
                ) : isProductInCart ? (
                  <div className="flex items-center">
                    <FiCheck className="mr-1" />
                    Added
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FiShoppingCart className="mr-2" />
                    Add
                  </div>
                )}
              </Button>
            )
          ) : (
            // Skeleton loader for SSR - matches the Add button size
            <div className="h-9 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
}