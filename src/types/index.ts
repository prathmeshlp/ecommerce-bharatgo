export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: { id: number; name: string };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  email: string | null;
}

export interface Order {
  id: number;
  date: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}