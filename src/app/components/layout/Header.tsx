// app/components/Layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  FiSearch, 
  FiShoppingCart, 
  FiHeart, 
  FiMapPin, 
  FiChevronDown, 
  FiGrid, 
  FiMenu
} from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { getCategories } from '@/app/actions/products';
import { BsTwitter } from 'react-icons/bs';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';

interface Category {
  id: number;
  name: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const router = useRouter();
  const { totalItems: cartTotal } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
  };

  const handleWishlistClick = () => {
    router.push('/wishlist');
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleAccountClick = () => {
    router.push('/account');
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#03484D] text-white">
        <div className="container mx-auto px-1 lg:px-4 flex justify-between items-center h-[60px] lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center justify-center mr-1">
              <img src="../../logo/logo.png" alt="Logo" width={120} height={64} />
            </div>
          </Link>

          {/* Search Bar with Category Dropdown (Desktop Only) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full relative">
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="h-full px-4 py-3 bg-gray-100 border border-gray-300 border-r-0 rounded-l-full flex items-center space-x-2 hover:bg-gray-200"
                >
                  <FiGrid className="text-gray-600" size={18} />
                  <span className="text-sm text-gray-600 font-medium">
                    {selectedCategory === 'all' ? 'All categories' :
                      categories.find(c => c.name === selectedCategory)?.name || 'All categories'}
                  </span>
                  <FiChevronDown className="text-gray-600" size={16} />
                </button>

                {/* Dropdown Menu */}
                {isCategoryDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <button
                        onClick={() => handleCategorySelect('all')}
                        className={`w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-100 ${selectedCategory === 'all' ? 'bg-primary-50 text-primary-600' : ''}`}
                      >
                        All categories
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.name)}
                          className={`w-full px-4 py-2 text-gray-600 text-left hover:bg-gray-100 capitalize ${selectedCategory === category.name ? 'bg-primary-50 text-primary-600' : ''}`}
                        >
                          {category.name.replace("'s", "'s ")}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search for products"
                className="flex-1 px-6 py-3 bg-gray-100 border border-gray-300 focus:outline-none text-gray-500 focus:ring-primary-100 shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <button
                type="submit"
                className="px-8 py-3 bg-primary-600 text-white rounded-r-full hover:bg-primary-700 transition-colors"
              >
                <FiSearch size={20} />
              </button>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Location */}
            <button className="hidden md:flex items-center p-2 hover:text-gray-100 rounded-lg">
              <FaPhone className="text-white-600 mr-2" size={20} />
              <div className="text-left">
                <div className="text-xs text-white-500">Call Us Now</div>
                <div className="text-sm font-medium">12345671</div>
              </div>
            </button>

            {/* Wishlist */}
            <button 
              onClick={handleWishlistClick}
              className="md:flex flex-col items-center p-2 hover:text-gray-100 rounded-lg relative"
            >
              <FiHeart className="text-white-600" size={22} />
              <span className="hidden text-xs text-white-500 mt-1 lg:flex">Wishlist</span>
              {wishlistTotal > 0 && (
                <span className="absolute -top-1 right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistTotal > 99 ? '99+' : wishlistTotal}
                </span>
              )}
            </button>

            {/* Cart - Direct link to cart page */}
            <button 
              onClick={handleCartClick}
              className="flex flex-col items-center p-2 hover:text-gray-100 rounded-lg relative"
            >
              <FiShoppingCart className="text-white-600" size={22} />
              <span className="text-xs text-white-500 mt-1 lg:flex hidden">Cart</span>
              {cartTotal > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartTotal > 99 ? '99+' : cartTotal}
                </span>
              )}
            </button>

            {/* Account */}
            <button 
              onClick={handleAccountClick}
              className="md:flex items-center p-2 hover:text-gray-100 rounded-lg"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                <FaRegUser className="text-gray-600" size={18} />
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs text-white-500">Account</div>
                <div className="text-sm font-medium">Sign In</div>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <span className="text-2xl font-bold">&times;</span>
              ) : (
                <FiMenu size={28} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ===== Category / Navigation Bar (Desktop Only) ===== */}
      <div className="bg-[#0E3B3E] text-white shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="hidden lg:flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <span className="flex items-center text-white-700 font-medium cursor-default">
                <div className="flex flex-col space-y-1 mr-2">
                  <span className="w-5 h-0.5 bg-white"></span>
                  <span className="w-5 h-0.5 bg-white"></span>
                  <span className="w-5 h-0.5 bg-white"></span>
                </div>
                Browse By Category
              </span>

              <Link href="/" className="text-white-700 hover:text-gray-300 font-medium">Home</Link>
              <Link href="/easy-installments" className="text-white-700 hover:text-gray-300 font-medium">
                Easy Monthly Installments
              </Link>
              <Link href="/shop-by-brand" className="text-white-700 hover:text-gray-300 font-medium">
                Shop by Brand
              </Link>
              <Link href="/become-vendor" className="text-white-700 hover:text-gray-300 font-medium">
                Become a Vendor
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaFacebookF size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <BsTwitter size={18} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      {isMenuOpen && (
        <div className="lg:hidden py-2 px-5 border-t bg-white">
          <div className="space-y-2">
            <div className="font-medium text-gray-900 mb-2">Browse By Category</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCategorySelect('all')}
                className="text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                All categories
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.name)}
                  className="text-left px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 capitalize"
                >
                  {category.name.replace("'s", "'s ")}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t space-y-2">
              <Link 
                href="/" 
                className="block py-2 text-gray-700 hover:text-primary-600" 
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/cart" 
                className="block py-2 text-gray-700 hover:text-primary-600" 
                onClick={() => setIsMenuOpen(false)}
              >
                Cart ({cartTotal})
              </Link>
              <Link 
                href="/wishlist" 
                className="block py-2 text-gray-700 hover:text-primary-600" 
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist ({wishlistTotal})
              </Link>
              <Link 
                href="/easy-installments" 
                className="block py-2 text-gray-700 hover:text-primary-600" 
                onClick={() => setIsMenuOpen(false)}
              >
                Easy Monthly Installments
              </Link>
              <Link 
                href="/shop-by-brand" 
                className="block py-2 text-gray-700 hover:text-primary-600" 
                onClick={() => setIsMenuOpen(false)}
              >
                Shop by Brand
              </Link>
              <Link 
                href="/become-vendor" 
                className="block py-2 text-gray-700 hover:text-primary-600" 
                onClick={() => setIsMenuOpen(false)}
              >
                Become a Vendor
              </Link>
              <div className="flex items-center space-x-4 pt-2">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  <FaFacebookF size={18} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  <BsTwitter size={18} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  <FaInstagram size={18} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                  <FaLinkedinIn size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== Mobile Search with Category Dropdown ===== */}
      <div className="lg:hidden py-0 bg-white">
        <form onSubmit={handleSearch} className="flex relative">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="h-full px-4 py-2 bg-gray-100 flex items-center space-x-2 border border-gray-300 border-r-0"
            >
              <FiGrid size={14} />
              <span className="" style={{fontSize:'10px'}}>
                {selectedCategory === 'all' ? 'All categories' : selectedCategory}
              </span>
              <FiChevronDown size={14} />
            </button>
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-50 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${selectedCategory === 'all' ? 'bg-primary-50 text-primary-600' : ''}`}
                >
                  All categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`w-full px-2 py-2 text-left hover:bg-gray-100 capitalize ${selectedCategory === category.name ? 'bg-primary-50 text-primary-600' : ''}`}
                  >
                    {category.name.replace("'s", "'s ")}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for products"
            className="flex-1 px-6 py-1 bg-gray-100 border border-gray-300 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm ps-[2px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-6 py-1 bg-primary-600 text-white hover:bg-primary-700"
          >
            <FiSearch size={20} />
          </button>
        </form>
      </div>
    </header>
  );
}