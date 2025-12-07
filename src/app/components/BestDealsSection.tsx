
// import { getAllProducts } from '../actions/products';
// import ProductGrid from './ProductGrid';
// import { Product } from '../types/product';
// import Container from './layout/Container';

// export default async function BestDealsSection() {
//   try {
//     const products = await getAllProducts(20);
    
//     // Sort by rating for best deals
//     const bestDeals = [...products]
//       .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
//       .slice(0, 8);
    
//     // Tabs data from the image
//     const tabs = [
//       { label: 'APPLIANCES', active: false },
//       { label: 'CONSOLES', active: false },
//       { label: 'TV & VIDEO', active: true }, // Assuming this is active from the image
//       { label: 'CELLPHONES', active: false },
//       { label: 'GROCERY', active: false },
//     ];
    
//     return (
//       <section className="py-12 bg-gray-50">
//         <Container>
//           <div className="mb-8">
//             {/* Header with title and tabs */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//               <div className="mb-4 md:mb-0">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-2">Best Deals</h2>
//                 <p className="text-gray-600">Don't miss these amazing offers</p>
//               </div>
              
//               {/* Tabs section - based on the image */}
//               <div className="flex flex-wrap gap-2 md:gap-0">
//                 {tabs.map((tab, index) => (
//                   <button
//                     key={index}
//                     className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
//                       tab.active
//                         ? 'bg-red-600 text-white'
//                         : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     } ${index === 0 ? 'rounded-l-lg' : ''} ${
//                       index === tabs.length - 1 ? 'rounded-r-lg' : ''
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
           
           
//           </div>
          
//           <ProductGrid products={bestDeals as Product[]} columns={4} />
          
//           <div className="text-center mt-8">
//             <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium">
//               View All Best Deals
//             </button>
//           </div>
//         </Container>
//       </section>
//     );
//   } catch (error) {
//     return (
//       <section className="py-12 bg-gray-50">
//         <Container>
//           <div className="text-center py-12">
//             <p className="text-gray-500">Failed to load best deals.</p>
//           </div>
//         </Container>
//       </section>
//     );
//   }
// }


// app/components/BestDealsSection.tsx
import { getAllProducts, getCategories } from '../actions/products';
import ProductGrid from './ProductGrid';
import { Product } from '../types/product';
import Container from './layout/Container';
import Link from 'next/link';

// Helper functions from your category page
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

export default async function BestDealsSection() {
  try {
    const products = await getAllProducts(20);
    
    // Sort by rating for best deals
    const bestDeals = [...products]
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      .slice(0, 8);
    
    // Get categories for the tabs
    let categories;
    try {
      categories = await getCategories();
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      categories = [];
    }
    
    // Get display names for all categories
    const allCategoriesWithDisplay = [
      ...categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        displayName: getCategoryDisplayName(cat.name),
        slug: getCategorySlug(cat.name)
      })),
    ];

    return (
      <section className="py-12 bg-gray-50">
        <Container>
          {/* Header with Best Deals title and Category Tabs in flex row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            {/* Title Section */}
            <div className="lg:w-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Best Deals</h2>
              <p className="text-gray-600">Don't miss these amazing offers</p>
            </div>
            
            {/* Category Navigation Tabs - Same as your category page */}
            <div className="flex overflow-x-auto space-x-4 pb-2 lg:pb-0">
              {allCategoriesWithDisplay.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="px-4 py-2 lg:px-6 lg:py-3 rounded-lg whitespace-nowrap transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 text-sm lg:text-base"
                >
                  {cat.displayName}
                </Link>
              ))}
            </div>
          </div>
          
          <ProductGrid products={bestDeals as Product[]} columns={4} />
          
          <div className="text-center mt-8">
            <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium">
              View All Best Deals
            </button>
          </div>
        </Container>
      </section>
    );
  } catch (error) {
    return (
      <section className="py-12 bg-gray-50">
        <Container>
          <div className="text-center py-12">
            <p className="text-gray-500">Failed to load best deals.</p>
          </div>
        </Container>
      </section>
    );
  }
}