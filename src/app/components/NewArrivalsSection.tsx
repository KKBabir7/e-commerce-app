import { getAllProducts } from '../actions/products';
import ProductGrid from './ProductGrid';

import { Product } from '../types/product';
import Container from './layout/Container';

export default async function NewArrivalsSection() {
  try {
    const products = await getAllProducts(10);
    
    return (
      <section className="py-12">
        <Container>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
            <p className="text-gray-600">Discover our latest products</p>
          </div>
          
          <ProductGrid products={products.slice(0, 8) as Product[]} columns={4} />
          
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium">
              View All New Arrivals
            </button>
          </div>
        </Container>
      </section>
    );
  } catch (error) {
    return (
      <section className="py-12">
        <Container>
          <div className="text-center py-12">
            <p className="text-gray-500">Failed to load new arrivals.</p>
          </div>
        </Container>
      </section>
    );
  }
}