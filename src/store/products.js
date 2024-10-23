import { defineStore } from 'pinia';
import { supabase } from '@/supabase'; // Ensure this points to your Supabase client instance

export const useProductsStore = defineStore({
  id: 'products',
  state: () => ({
    products: [], // Initialize products as an empty array
  }),
  getters: {
    getProducts(state) {
      return state.products;
    },
    getProduct: (state) => (id) => {
      return state.products.find((p) => p.id == id); // Use find for simplicity
    },
  },
  actions: {
    // Method to add products to the state
    addProducts(products) {
      this.products = products;
    },
    // Fetch products from Supabase
    async fetchProducts() {  // Correct method name
      try {
        const { data, error } = await supabase
          .from('products') // Replace 'products' with your actual table name
          .select('*'); // Fetch all fields from the products table
        
        if (error) {
          throw error; // Handle error by throwing
        }
        
        this.addProducts(data); // Update store with fetched data
        return true; // Return true on success
      } catch (error) {
        console.error('Error fetching products:', error);
        return false; // Return false on failure
      }
    },
    // Optionally, you could add methods for adding, updating, or deleting products
    async addProduct(newProduct) {
      try {
        const { data, error } = await supabase
          .from('products') // Use your table name
          .insert(newProduct); // Insert new product
        
        if (error) {
          throw error;
        }
        
        this.products.push(data[0]); // Add the new product to the local state
        return true; // Return true on success
      } catch (error) {
        console.error('Error adding product:', error);
        return false; // Return false on failure
      }
    },
  },
});
