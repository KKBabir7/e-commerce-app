'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types/product';
import { getAllProducts } from '../actions/products';
import Container from '../components/layout/Container';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      filterProducts();
    }
  }, [query, category, products]);

  const fetchProducts = async () => {
    try {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="py-12">
        <Container>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading search results...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {query && `"${query}"`} 
            {category !== 'all' && ` in ${category.replace("'s", "'s ")}`}
            {!query && category === 'all' && 'All Products'}
            <span className="ml-2">({filteredProducts.length} products found)</span>
          </p>
        </div>
        
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} columns={4} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your search criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </Container>
    </div>
  );
}