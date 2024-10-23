<template>
	<div class="nice">
	  <Header />
	  <div class="login-box">
		<h2>Login</h2>
		<form @submit.prevent="handleSubmit">
		  <div class="user-box">
			<input type="email" name="email" required v-model="user.email" @focus="clearError" />
			<label>Email</label>
		  </div>
		  <div class="user-box">
			<input type="password" name="password" required v-model="user.password" @focus="clearError" />
			<label>Password</label>
		  </div>
		  <button type="submit" name="go" style="color: rgb(255, 255, 255); background-color: black;">
			<span></span>
			<span></span>
			<span></span>
			<span></span>
			Submit
		  </button>
		  <p v-if="error" class="error-message">{{ error }}</p>
		</form>
	  </div>
	  <Footer />
	</div>
</template>

<script>
import Header from '@/components/Header.vue'; // Ensure this path is correct
import Footer from '@/components/Footer.vue';
import { supabase } from '@/supabase'; // Import your Supabase client
import { useUserStore } from '@/store/user'; // Import your user store

export default {
	components: {
		Header,
		Footer
	},
	data() {
		return {
			user: {
				email: '',
				password: '',
			},
			submitting: false,
			error: '',
		}
	},

	methods: {
		clearError() {
			this.error = ''; // Clear error when user focuses on input
		},

		async handleSubmit() {
			this.submitting = true;
			this.error = ''; // Clear previous error messages

			// Validate inputs
			if (this.user.password === '' || this.user.email === '') {
				this.error = 'Please complete all required fields!';
				this.submitting = false;
				return;
			}

			console.log('Attempting to log in with:', this.user); // Log the input

			// Get the user store instance
			const userStore = useUserStore();

			// Attempt to log in using the user store's logIn method
			const success = await userStore.logIn(this.user.email, this.user.password);

			if (success) {
				// Successful login
				this.$router.push("/message/5");
			} else {
				// If there's an error, the logIn method already handles it
			}

			this.submitting = false; // Reset submitting state
		},
	},

	created() {
		this.submitting = false;
		this.error = '';
	}
}
</script>

  
<style scoped>
  .nice {
	  margin: 0;
	  padding: 0;
	  font-family: sans-serif;
	  background: linear-gradient(#2d343f, #254e7b);
  }
  .error-message {
	color: red; /* Style for error messages */
  }
</style>
  