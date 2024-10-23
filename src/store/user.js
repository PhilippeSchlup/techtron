import { defineStore } from 'pinia';
import { supabase } from '@/supabase'; // Ensure this is correctly pointing to your Supabase client instance

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null, // Store the user object after authentication
  }),
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    // Set user data in the store
    loginUser(user) {
      this.user = user;
    },
    // Clear user data from the store
    logoutUser() {
      this.user = null;
    },

    
    async signUp(email, password, name) {
      try {
        // Log the signup attempt
        console.log('Attempting to sign up user:', { email, name });
    
        // Sign up the user using Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
    
        // Log the response for debugging
        console.log('Supabase signUp response:', { data, error });
    
        // Check for sign-up error
        if (error) {
          console.error('Sign up error:', error); // Log detailed error
          alert(error.message); // Provide user feedback on error
          return false; // Return false on failure
        }
    
        // Check if user data is defined
        if (!data || !data.user) {
          console.error('User object is undefined after signup');
          alert('An unexpected error occurred during signup. Please try again.');
          return false;
        }
    
        // After successful signup, insert user details into your users table
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            auth_user_id: data.user.id, // Use the user id from the data object
            name: name,
            email: data.user.email, // Use the email from the user object
          }]);
    
        // Check if there was an error inserting user details
        if (insertError) {
          console.error('Error inserting user details:', insertError);
          alert('An error occurred while saving user details: ' + insertError.message); // Provide detailed error message
          return false; // Return false on failure
        }
    
        // Optionally log success
        console.log('User successfully inserted into users table:', { auth_user_id: data.user.id, name, email: data.user.email });
    
        // Store the user details in the store for later use
        this.loginUser(data.user); // Correctly pass the user data from the signUp response
        return true; // Return true on success
      } catch (error) {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred. Please try again later.');
        return false; // Return false on unexpected error
      }
    },
    
         
      
    // Log in a user with Supabase
    async logIn(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error('Log in error:', error);
        alert('Error: Wrong credentials');
        return false; // Return false on failure
      }
      this.loginUser(data.user); // Store user details on successful login
      return true; // Return true on success
    },
    // Log out a user with Supabase
    async logOut() {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Log out error:', error);
        return false; // Return false on failure
      }
      this.logoutUser(); // Clear user details on successful logout
      return true; // Return true on success
    },
    // Fetch the current user session from Supabase
    async fetchCurrentUser() {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        this.loginUser(data.user); // Store user details if session exists
      } else {
        this.logoutUser(); // Clear user details if no session
      }
    },
    async fetchInternalUserId(authUserId) {
      try {
        const { data, error } = await supabase
          .from('users') // Replace 'users' with your actual table name
          .select('id') // Assuming the internal user ID column is 'id'
          .eq('auth_user_id', authUserId) // Assuming the auth UUID is stored as 'auth_user_id'
          .single(); // Expecting a single match

        if (error || !data) {
          console.error('Error fetching internal user ID:', error);
          return null;
        }

        this.internalUserId = data.id; // Store the internal user ID
        return data.id; // Return the internal user ID (integer)
      } catch (error) {
        console.error('Error fetching internal user ID:', error);
        return null;
      }
    },
  },
});
