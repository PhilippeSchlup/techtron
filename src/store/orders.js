import { defineStore } from 'pinia';
import { supabase } from '@/supabase'; // Ensure this points to your Supabase client instance
import { useUserStore } from './user'; // Import your user store for session management

export const useOrdersStore = defineStore({
  id: 'orders',
  state: () => ({
    orders: [], // Initialize orders as an empty array
  }),
  getters: {
    getOrders(state) {
      return state.orders;
    },
  },
  actions: {
    // Method to add multiple orders
    addOrders(orders) {
      this.orders = orders;
    },
    // Method to add a single order
    addOrder(order) {
      this.orders = [...this.orders, order];
    },
    // Fetch user's orders from Supabase
    // Fetch user's orders from Supabase
    async getMyOrdersDB() {
      try {
          const userStore = useUserStore(); // Access user store for session info
          const authUserId = userStore.getUser.id; // Get the logged-in user's UUID
          
          // Fetch the internal user ID (integer) using the Supabase auth user UUID
          const internalUserId = await userStore.fetchInternalUserId(authUserId);
          if (!internalUserId) {
              console.error('Failed to fetch internal user ID.');
              return false;
          }

          // Now use the internal user ID to fetch the orders
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', internalUserId); // Use internal user ID (integer) for filtering

          if (error) {
              throw error; // Handle error by throwing
          }

          this.addOrders(data); // Update store with fetched orders
          return true; // Return true on success
      } catch (error) {
          console.error('Error fetching orders:', error);
          return false; // Return false on failure
      }
    },
    async addOrderDB(order) {
        console.log(order);
        try {
            // Insert the order and retrieve the inserted data
            const { data, error } = await supabase
                .from('orders') // Use your actual orders table name
                .insert({
                    user_id: order.user_id, // This should be a UUID
                    total: order.total, // Ensure this is a valid number
                    status_id: order.status_id, // This should be an integer
                    created_at: order.created_at, // Correct date format
                })
                .select(); // Select to return the newly created row
    
            if (error) {
                throw error; // Throw error if any
            }
    
            // Return the ID of the newly created order
            return data[0].id; // Assuming `data` contains the newly created order object
        } catch (error) {
            console.error('Error adding order:', error);
            return null; // Return null on failure
        }
    },
   
    async addOrderItemDB(orderId, item) {
      console.log(item.id);
      try {
          const { error } = await supabase
              .from('order_items') // Use your actual order_items table name
              .insert({
                  order_id: orderId,
                  product_id: item.id,
                  quantity: item.quantity,
              });
  
          if (error) {
              throw error; // Handle error by throwing
          }

          return 1;
      } catch (error) {
          console.error('Error adding order item:', error);
          throw new Error('Failed to add order item.'); // Propagate error
      }
    },    

    async fetchStatusIdByName(name) {
      try {
        const { data, error } = await supabase
          .from('status')
          .select('id')
          .eq('description', name);
    
        if (error) {
          throw error; // Throw error if query fails
        }
    
        if (!data || data.length === 0) {
          console.error(`No status found with description: ${name}`);
          return null; // Return null if no matching status
        }
    
        return data[0].id; // Return the first matching status ID
      } catch (error) {
        console.error('Error fetching status ID:', error);
        return null; // Return null on error
      }
    },
       
  },
});
