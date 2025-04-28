import { Product } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};