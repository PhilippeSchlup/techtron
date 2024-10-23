import { defineStore } from 'pinia'

export const useBasketStore = defineStore({
  id: 'basket',
  state: () => ({
    products: [
      // {
      //   id: 1,
      //   quantity: 5
      // },
      // {
      //   id: 2,        
      //   quantity: 2
      // },
      // {
      //   id: 3,        
      //   quantity: 3
      // }
    ]
  }),
  getters: {
    getProducts(state) {
      return state.products;
    },
  },
  actions: {
    clearBasket() {
      this.products = [];
    },
    incrementProduct(idToIncrement) {
      // Check if item exists in basket
      const existingItem = this.products.find(item => item.id === idToIncrement);

      // Item exists; increment quantity
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Item does not exist; create item
        this.products.push({
          id: idToIncrement,
          quantity: 1
        });
      }
    },
    decrementProduct(idToDecrement) {
      // Find the index of the item in the basket
      const index = this.products.findIndex(item => item.id === idToDecrement);

      // Remove item if it exists and quantity is greater than 0
      if (index !== -1 && this.products[index].quantity > 0) {
        this.products[index].quantity -= 1;

        // Remove the item from the basket if quantity becomes 0
        if (this.products[index].quantity === 0) {
          this.products.splice(index, 1);
        }
      }
    }
  }
});
