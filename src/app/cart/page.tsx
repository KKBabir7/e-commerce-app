// app/cart/page.tsx
'use client';

import { useState } from 'react';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

import Button from '../components/ui/Button';
import Image from 'next/image';
import Container from '../components/layout/Container';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, quantity);
    }
  };

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Checkout functionality would be implemented here!');
      setIsLoading(false);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="py-12">
        <Container>
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Cart Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50">
                <div className="col-span-6 font-medium text-gray-700">Product</div>
                <div className="col-span-2 font-medium text-gray-700 text-center">Price</div>
                <div className="col-span-2 font-medium text-gray-700 text-center">Quantity</div>
                <div className="col-span-2 font-medium text-gray-700 text-center">Total</div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-6">
                        <div className="flex items-center">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden mr-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-500 capitalize">
                              {item.category.replace("'s", "'s ")}
                            </p>
                            <div className="flex items-center mt-2">
                              <div className="flex items-center">
                                <span className="text-yellow-400">★</span>
                                <span className="ml-1 text-sm font-medium">{item.rating.rate}</span>
                                <span className="text-sm text-gray-500 ml-1">({item.rating.count})</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2">
                        <div className="text-center">
                          <span className="text-lg font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-2">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                            >
                              <FiMinus size={16} />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="w-12 h-10 text-center border-0 focus:outline-none focus:ring-0"
                            />
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                            >
                              <FiPlus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Total and Actions */}
                      <div className="col-span-2">
                        <div className="flex items-center justify-center space-x-4">
                          <span className="text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="flex items-center"
                  >
                    <FiArrowLeft className="mr-2" />
                    Continue Shopping
                  </Button>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear Cart
                    </button>
                    <Link href="/category/all">
                      <Button variant="outline">
                        Add More Items
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({totalItems}):</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax:</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${(totalPrice * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full mt-8"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Proceed to Checkout'
                )}
              </Button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Free shipping on orders over $50
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Easy returns within 30 days
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Secure Payment</h3>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-8 bg-gray-100 rounded"></div>
                  <div className="w-12 h-8 bg-gray-100 rounded"></div>
                  <div className="w-12 h-8 bg-gray-100 rounded"></div>
                  <div className="w-12 h-8 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}