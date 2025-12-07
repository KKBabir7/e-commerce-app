// app/wishlist/page.tsx
'use client';

import { FiHeart, FiTrash2, FiShoppingCart, FiArrowLeft, FiStar } from 'react-icons/fi';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

import Button from '../components/ui/Button';
import { useWishlist } from '../context/WishlistContext';
import Container from '../components/layout/Container';


export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist, totalItems } = useWishlist();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const handleAddToCart = async (productId: number) => {
    setAddingToCart(productId);
    const product = items.find(item => item.id === productId);
    if (product) {
      addToCart(product);
      // Simulate loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      setAddingToCart(null);
    }
  };

  const handleMoveAllToCart = () => {
    items.forEach(product => {
      addToCart(product);
    });
  };

  if (items.length === 0) {
    return (
      <div className="py-12">
        <Container>
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven&apos;t added any items to your wishlist yet. Start exploring and save your favorite products!
            </p>
            <div className="space-x-4">
              <Link href="/">
                <Button variant="primary" className="flex items-center">
                  <FiArrowLeft className="mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/category/all">
                <Button variant="outline">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button
              variant="outline"
              onClick={handleMoveAllToCart}
              className="flex items-center"
            >
              <FiShoppingCart className="mr-2" />
              Move All to Cart
            </Button>
            <Button
              variant="outline"
              onClick={clearWishlist}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <FiTrash2 className="mr-2" />
              Clear All
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
                
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 text-gray-600 transition-colors"
                >
                  <FiTrash2 size={18} />
                </button>
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
                  
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={addingToCart === product.id}
                    className="flex items-center"
                  >
                    {addingToCart === product.id ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Adding
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <FiShoppingCart className="mr-2" />
                        Add to Cart
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wishlist Actions */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="flex items-center">
                  <FiArrowLeft className="mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline">
                  View Cart
                </Button>
              </Link>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Products will remain in your wishlist until you remove them.</p>
              <p className="mt-1">You can add items to your cart directly from here.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}