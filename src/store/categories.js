import { defineStore } from 'pinia';
import { supabase } from '@/supabase'; // Ensure this points to your Supabase client instance

export const useCategoriesStore = defineStore({
  id: 'categories',
  state: () => ({
    categories: [], // Initialize categories as an empty array
  }),
  getters: {
    getCategories(state) {
      return state.categories; // Return the current categories
    },
  },
  actions: {
    // Method to add multiple categories
    addCategories(categories) {
      this.categories = categories; // Update the categories state
    },
    async getCategoriesDB() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*'); // Fetch all columns

        if (error) {
          throw error; // Handle error by throwing
        }

        console.log('Received categories:', data); // Log the received data
        this.categories = data; // Directly update state
        return true; // Return true on success
      } catch (error) {
        console.error('Error fetching categories:', error); // Log any errors
        return false; // Return false on failure
      }
    },
  },
});
