// // app/page.tsx
// import { Suspense } from 'react';
// import HeroSection from './components/HeroSection';
// import CategorySection from './components/CategorySection';
// import { getAllProducts, getCategories, getProductsByCategory } from './actions/products';

// import ProductGrid from './components/ProductGrid';
// import { Product } from './types/product';
// import { FiStar } from 'react-icons/fi';
// import Container from './components/layout/Container';

// async function ProductsContent() {
//   try {
//     // Fetch data in parallel
//     const [recentProducts, categories, electronicsProducts] = await Promise.all([
//       getAllProducts(10),
//       getCategories(),
//       getProductsByCategory('electronics', 8)
//     ]);

//     // Get products for jewelry category
//     const jewelryProducts = await getProductsByCategory('jewelery', 6);
//     const mensClothingProducts = await getProductsByCategory("men's clothing", 6);
//     const womensClothingProducts = await getProductsByCategory("women's clothing", 6);

//     return (
//       <>
//         {/* New Arrivals Section */}
//         <section className="py-12">
//           <Container>
//             <div className="mb-8">
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
//               <p className="text-gray-600">Discover our latest products</p>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//               {recentProducts.slice(0, 5).map((product: any) => (
//                 <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
//                   <div className="h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center overflow-hidden">
//                     <img 
//                       src={product.image} 
//                       alt={product.title}
//                       className="h-full w-full object-contain p-2"
//                     />
//                   </div>
//                   <div className="text-sm font-medium text-gray-900 line-clamp-2 h-10">
//                     {product.title}
//                   </div>
//                   <div className="flex items-center mt-2">
//                     <div className="flex items-center">
//                       <FiStar className="text-yellow-400 fill-yellow-400" size={14} />
//                       <span className="text-sm text-gray-600 ml-1">{product.rating?.rate || 0}</span>
//                     </div>
//                     <div className="text-primary-600 font-bold ml-auto">
//                       ${product.price.toFixed(2)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Container>
//         </section>

//         {/* Best Deals Section */}
//         <section className="py-12 bg-gray-50">
//           <Container>
//             <div className="mb-8">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Best Deals</h2>
//                   <p className="text-gray-600">Don&apos;t miss these amazing offers</p>
//                 </div>
//                 <button className="mt-4 sm:mt-0 text-primary-600 hover:text-primary-700 font-medium">
//                   View All Deals →
//                 </button>
//               </div>
//             </div>
            
//             <ProductGrid products={recentProducts.slice(0, 6) as Product[]} columns={4} />
//           </Container>
//         </section>

//         {/* Kitchen Appliances Section */}
//         <section className="py-12">
//           <Container>
//             <div className="mb-8">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">KITCHEN APPLIANCES</h2>
//                   <p className="text-gray-600">Modern appliances for your kitchen</p>
//                 </div>
//                 <button className="mt-4 sm:mt-0 text-primary-600 hover:text-primary-700 font-medium">
//                   View All Kitchen →
//                 </button>
//               </div>
//             </div>
            
//             <ProductGrid products={electronicsProducts.slice(0, 8) as Product[]} columns={4} />
//           </Container>
//         </section>

//         {/* Jewelry Section */}
//         <section className="py-12 bg-gray-50">
//           <Container>
//             <div className="mb-8">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">JEWELERY</h2>
//                   <p className="text-gray-600">Beautiful jewelry collection</p>
//                 </div>
//                 <button className="mt-4 sm:mt-0 text-primary-600 hover:text-primary-700 font-medium">
//                   View All Jewelry →
//                 </button>
//               </div>
//             </div>
            
//             <ProductGrid products={jewelryProducts as Product[]} columns={4} />
//           </Container>
//         </section>

//         {/* Categories Grid */}
//         <section className="py-12">
//           <Container>
//             <div className="mb-8">
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
//               <p className="text-gray-600">Browse products by category</p>
//             </div>
            
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {categories.map((category: any) => (
//                 <div
//                   key={category.id}
//                   className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow cursor-pointer"
//                 >
//                   <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <span className="text-primary-600 font-bold text-xl">
//                       {category.name.charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <h3 className="font-semibold text-gray-900 text-lg capitalize mb-2">
//                     {category.name.replace("'s", "'s ")}
//                   </h3>
//                   <p className="text-gray-500 text-sm">
//                     Browse collection
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </Container>
//         </section>

//         {/* Men's Clothing Section */}
//         <section className="py-12 bg-gray-50">
//           <Container>
//             <div className="mb-8">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">MEN&apos;S CLOTHING</h2>
//                   <p className="text-gray-600">Stylish clothing for men</p>
//                 </div>
//                 <button className="mt-4 sm:mt-0 text-primary-600 hover:text-primary-700 font-medium">
//                   View All →
//                 </button>
//               </div>
//             </div>
            
//             <ProductGrid products={mensClothingProducts as Product[]} columns={4} />
//           </Container>
//         </section>

//         {/* Women's Clothing Section */}
//         <section className="py-12">
//           <Container>
//             <div className="mb-8">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">WOMEN&apos;S CLOTHING</h2>
//                   <p className="text-gray-600">Fashionable clothing for women</p>
//                 </div>
//                 <button className="mt-4 sm:mt-0 text-primary-600 hover:text-primary-700 font-medium">
//                   View All →
//                 </button>
//               </div>
//             </div>
            
//             <ProductGrid products={womensClothingProducts as Product[]} columns={4} />
//           </Container>
//         </section>
//       </>
//     );
//   } catch (error) {
//     console.error('Error in ProductsContent:', error);
//     return (
//       <div className="text-center py-12">
//         <Container>
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Products</h2>
//           <p className="text-gray-600 mb-6">Please try again later.</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="btn-primary"
//           >
//             Retry
//           </button>
//         </Container>
//       </div>
//     );
//   }
// }

// export default function Home() {
//   return (
//     <div>
//       <HeroSection />
      
//       <Suspense fallback={
//         <div className="py-12">
//           <Container>
//             <div className="text-center">
//               <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading products...</p>
//             </div>
//           </Container>
//         </div>
//       }>
//         <ProductsContent />
//       </Suspense>
//     </div>
//   );
// }


// app/page.tsx
import { Suspense } from 'react';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import NewArrivalsSection from './components/NewArrivalsSection';

import LoadingSpinner from './components/ui/LoadingSpinner';
import BestDealsSection from './components/BestDealsSection';
import Container from './components/layout/Container';


async function HomeContent() {
  return (
    <div>
      <HeroSection />
      
      {/* Browse By Category Section */}
      <CategorySection />
      
      {/* New Arrivals Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <NewArrivalsSection />
      </Suspense>
      
      {/* Best Deals Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <BestDealsSection />
      </Suspense>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="py-12">
        <Container>
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </Container>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}