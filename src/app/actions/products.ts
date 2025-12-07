'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://mm-assesment-server.vercel.app/api/v1';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getAllProducts(limit?: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: 'force-cache',
      next: { tags: ['products'] }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    
    const result: ApiResponse<any[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch products');
    }
    
    const products = result.data || [];
    
    if (limit && Array.isArray(products)) {
      return products.slice(0, limit);
    }
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      cache: 'force-cache',
      next: { tags: ['categories'] }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    
    const result: ApiResponse<any[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch categories');
    }
    
    return result.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getProductsByCategory(category: string, limit?: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`, {
      cache: 'force-cache',
      next: { tags: ['products', category] }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category ${category}: ${response.statusText}`);
    }
    
    const result: ApiResponse<any[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || `Failed to fetch products for category ${category}`);
    }
    
    const products = result.data || [];
    
    if (limit && Array.isArray(products)) {
      return products.slice(0, limit);
    }
    
    return products;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw new Error(`Failed to fetch products for category ${category}`);
  }
}

export async function getProductById(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'force-cache',
      next: { tags: ['products', `product-${id}`] }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}: ${response.statusText}`);
    }
    
    const result: ApiResponse<any> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || `Failed to fetch product ${id}`);
    }
    
    return result.data || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Failed to fetch product ${id}`);
  }
}