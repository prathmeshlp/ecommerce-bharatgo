import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, CartItem, Order } from "../types";
import { fetchProducts as fetchProductsAPI } from "../services/api";

interface ProductState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  searchTerm: string;
  category: string;
  selectedProduct: Product | null;
  showCheckout: boolean;
  isSidebarOpen: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
console.log();

const initialState: ProductState = {
  products: [],
  cart: [],
  orders: [],
  searchTerm: "",
  category: "All",
  selectedProduct: null,
  showCheckout: false,
  isSidebarOpen: false,
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProductsAPI();
    return response;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    addToCart: (state, action) => {
      console.log(action.payload);
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        state.cart.push(newItem);
      }
      state.showCheckout = true;
      state.isSidebarOpen = true;
      state.selectedProduct = null;
    },
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      state.cart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.showCheckout = false;
      state.isSidebarOpen = true;
    },
    toggleCheckout: (state, action) => {
      state.showCheckout = action.payload;
      state.isSidebarOpen = true;
      state.selectedProduct = null;
    },
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
      state.showCheckout = false;
    },
    createOrder: (state) => {
      if (state.cart.length === 0) return;
      const order: Order = {
        id: state.orders.length + 1,
        date: new Date().toISOString().split('T')[0],
        items: [...state.cart],
        totalItems: state.cart.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };
      state.orders.push(order);
      state.cart = [];
      state.showCheckout = false;
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const {
  setSearchTerm,
  setCategory,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  setSelectedProduct,
  toggleCheckout,
  toggleSidebar,
  clearCart,
  createOrder
} = productSlice.actions;

export default productSlice.reducer;
