// app/category/[category]/page.tsx

import Container from '@/app/components/layout/Container';
import { getCategories, getProductsByCategory, getAllProducts } from '../../actions/products';
import ProductGrid from '../../components/ProductGrid';
import { Product } from '../../types/product';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

// Helper function to convert URL slug to API category name
function getApiCategoryName(slug: string): string {
  if (!slug) return 'all';
  
  const categoryMap: Record<string, string> = {
    'electronics': 'electronics',
    'jewelry': 'jewelery',
    'jewelery': 'jewelery',
    'mens-clothing': "men's clothing",
    'men-clothing': "men's clothing",
    'mens': "men's clothing",
    'womens-clothing': "women's clothing",
    'women-clothing': "women's clothing",
    'womens': "women's clothing",
    'fashion': "men's clothing",
    'appliances': "women's clothing",
    'all': 'all',
    'babies-store': 'all',
    'babies': 'all'
  };
  
  return categoryMap[slug.toLowerCase()] || slug;
}

// Helper function to get display name for category
function getCategoryDisplayName(apiCategoryName: string): string {
  const displayMap: Record<string, string> = {
    'electronics': 'Electronics',
    'jewelery': 'Jewelry',
    "men's clothing": 'Fashion',
    "women's clothing": 'Appliances',
    'all': 'All Products'
  };
  
  return displayMap[apiCategoryName] || apiCategoryName.replace("'s", "'s ");
}

// Helper function to get URL slug for category
function getCategorySlug(apiCategoryName: string): string {
  const slugMap: Record<string, string> = {
    'electronics': 'electronics',
    'jewelery': 'jewelry',
    "men's clothing": 'fashion',
    "women's clothing": 'appliances',
    'all': 'all'
  };
  
  return slugMap[apiCategoryName] || apiCategoryName;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    // Await the params promise
    const resolvedParams = await params;
    
    if (!resolvedParams?.category) {
      notFound();
    }
    
    // Decode the category from URL
    const categorySlug = decodeURIComponent(resolvedParams.category);
    
    // Convert URL slug to API category name
    const apiCategoryName = getApiCategoryName(categorySlug);
    
    let products: Product[] = [];
    let categories;
    
    try {
      categories = await getCategories();
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      categories = [];
    }
    
    try {
      if (apiCategoryName === 'all') {
        // If category is 'all', get all products
        products = await getAllProducts();
      } else {
        // Get products by specific category
        products = await getProductsByCategory(apiCategoryName);
      }
    } catch (error) {
      console.error(`Failed to fetch products for ${apiCategoryName}:`, error);
      products = [];
    }
    
    const displayName = getCategoryDisplayName(apiCategoryName);
    
    // Get display names for all categories including custom ones
    const allCategoriesWithDisplay = [
      ...categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        displayName: getCategoryDisplayName(cat.name),
        slug: getCategorySlug(cat.name)
      })),
      // Add Babies Store as a custom category
      
    ];

    return (
      <div className="py-12">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {displayName}
            </h1>
            <p className="text-gray-600">
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          
          {/* Category Navigation */}
          <div className="flex overflow-x-auto space-x-4 mb-8 pb-4">
            {allCategoriesWithDisplay.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`px-6 py-3 rounded-lg whitespace-nowrap transition-colors ${
                  cat.slug === categorySlug 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {cat.displayName}
              </Link>
            ))}
          </div>
          
          {products.length > 0 ? (
            <>
              <ProductGrid products={products as Product[]} columns={4} />
              
              {/* Show message if no more products to load */}
              {products.length < 20 && (
                <div className="text-center mt-8">
                  <p className="text-gray-500">
                    Showing all {products.length} products
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">😞</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn&apos;t find any products in this category.
              </p>
              <div className="space-x-4">
                <a 
                  href="/" 
                  className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Back to Home
                </a>
                <a 
                  href="/category/all" 
                  className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Browse All Products
                </a>
              </div>
            </div>
          )}
          
          {/* Category Description */}
          {products.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                About {displayName}
              </h2>
              <p className="text-gray-600">
                {apiCategoryName === 'electronics' && 'Discover the latest electronics and gadgets. From smartphones to laptops, find the best deals on tech products with our extensive collection.'}
                {apiCategoryName === 'jewelery' && 'Explore our beautiful jewelry collection. From elegant necklaces to stunning rings, find the perfect piece for any occasion. Each item is carefully selected for quality and style.'}
                {apiCategoryName === "men's clothing" && 'Browse our fashion collection for men. Find stylish clothing, shoes, and accessories for every season and occasion. From casual wear to formal attire, we have everything you need.'}
                {apiCategoryName === "women's clothing" && 'Discover appliances and home essentials. From kitchen appliances to home decor, find everything you need for your home. Our collection features quality products for everyday living.'}
                {apiCategoryName === 'all' && 'Browse all our products across every category. Find everything you need in one place with our extensive collection of quality items for your home, wardrobe, and lifestyle.'}
              </p>
            </div>
          )}
        </Container>
      </div>
    );
  } catch (error) {
    console.error('Error in CategoryPage:', error);
    
    return (
      <div className="py-12">
        <Container>
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-red-600">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something Went Wrong</h2>
            <p className="text-gray-600 mb-6">
              We&apos;re having trouble loading this category. Please try again later.
            </p>
            <div className="space-x-4">
              <a 
                href="/" 
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Back to Home
              </a>
              <button 
                onClick={() => window.location.reload()}
                className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

// Generate static params for all categories
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    
    // Create paths for all API categories
    const categoryPaths = categories.map(category => ({
      category: getCategorySlug(category.name)
    }));
    
    // Add additional paths for custom categories
    const additionalPaths = [
      { category: 'all' },
      { category: 'babies-store' }
    ];
    
    return [...categoryPaths, ...additionalPaths];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: CategoryPageProps) {
  try {
    const resolvedParams = await params;
    const categorySlug = resolvedParams?.category ? decodeURIComponent(resolvedParams.category) : 'all';
    const apiCategoryName = getApiCategoryName(categorySlug);
    const displayName = getCategoryDisplayName(apiCategoryName);
    
    return {
      title: `${displayName} - Winstore`,
      description: `Browse our ${displayName} collection. Find quality products at great prices.`,
    };
  } catch (error) {
    return {
      title: 'Category - Winstore',
      description: 'Browse our product categories',
    };
  }
}