import { defineStore } from 'pinia';

export const useBasketStore = defineStore({
  id: 'basket',
  state: () => ({
    products: [] // Array to hold products in the basket
  }),
  getters: {
    getProducts(state) {
      return state.products;
    },
    totalBasketItems(state) {
      return state.products.reduce((total, item) => total + item.quantity, 0); // Calculate total items in basket
    },
    totalBasketPrice(state) {
      return state.products.reduce((total, item) => total + (item.price * item.quantity), 0); // Calculate total price
    }
  },
  actions: {
    clearBasket() {
      this.products = []; // Clear the basket
    },
    incrementProduct(idToIncrement, price) {
      console.log(price);
      const existingItem = this.products.find(item => item.id === idToIncrement);
      
      if (existingItem) {
        existingItem.quantity += 1; // If item already exists, just increment quantity
      } else {
        this.products.push({
          id: idToIncrement,
          price: price, // Add price to product details
          quantity: 1 // Set initial quantity to 1
        });
      }
    },
    decrementProduct(idToDecrement) {
      const index = this.products.findIndex(item => item.id === idToDecrement);
      if (index !== -1 && this.products[index].quantity > 0) {
        this.products[index].quantity -= 1; // Decrease the quantity
        if (this.products[index].quantity === 0) {
          this.products.splice(index, 1); // Remove product from basket if quantity is zero
        }
      }
    },
    getItems() {
      return this.products; // Return the current products in the basket
    }
  }
});
