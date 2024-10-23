<template>
	<div class="nice">



		<Header />


		<div v-if="user.id !== ''" class="login-box" style="margin-top: 30px;">
			<h2>Sign Up</h2>
			<form @submit.prevent="handleSubmit">
				<div class="form-group">
						<h4 style="text-align: center; font-weight: bold;">
							<span style="color:red">
								<p v-if="this.error != ''">
									{{ error }}
								</p>
							</span>
						</h4>
					</div>
				<div class="user-box">
					<input type="text" name="name" required="" v-model="user.name">
					<label>Name</label>
				</div>
				<div class="user-box">
					<input type="email" name="email" required="" v-model="user.email">
					<label>Email</label>
				</div>
				<div class="user-box">
					<input type="password" name="password" required="" v-model="user.password">
					<label>Password</label>
				</div>
				<div class="user-box">
					<input type="password" name="password-confirmation" required="" v-model="passwordConfirmation">
					<label>Password Confirmation</label>
				</div>
				<button type="submit" name="go" style="color: rgb(255, 255, 255); background-color: black;">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Submit
				</button>
			</form>
		</div>
		<div v-else>
			<h3 style="text-align: center;">Logout first </h3>
		</div>

		<Footer />

	</div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { useUserStore } from '@/store/user'; // Import the user store

export default {
  components: {
    Footer,
    Header,
  },
  setup() {
    const userStore = useUserStore(); // Access the user store
    return { userStore };
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
      passwordConfirmation: '',
      submitting: false,
      error: '',
    };
  },
  methods: {
    async handleSubmit() {
      this.submitting = true;
      this.error = ''; // Reset any previous error

      // Validate inputs
      const nameError = this.invalidName();
      const emailError = this.invalidEmail();
      const passwordError = this.invalidPassword();
      const passwordConfirmationError = this.invalidPasswordConfirmation();

      // Concatenate error messages
      this.error = nameError + emailError + passwordError + passwordConfirmationError;

      // Check if there are any errors
      if (this.error !== '') {
        this.submitting = false;
        return;
      }

      // Use the updated signUp method from the store, passing the name as well
      const success = await this.userStore.signUp(this.user.email, this.user.password, this.user.name); // Use the userStore from setup

      if (!success) {
        this.submitting = false; // Stop submitting if there's an error
        return;
      }

      // Redirect or show a success message if signup is successful
      this.$router.push("/message/4");
      this.submitting = false; // Reset submitting state
    },

    invalidName() {
      return this.user.name === '' ? 'Invalid name!\n' : ''; // Added newline for better readability
    },
    invalidPassword() {
      return this.user.password === '' || this.user.password.length < 8 ? 'Password too short, it has to be at least 8 characters!\n' : ''; // Added newline
    },
    invalidPasswordConfirmation() {
      return this.user.password !== this.passwordConfirmation ? 'Passwords do not match!\n' : ''; // Corrected error message
    },
    invalidEmail() {
      const regExpr = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return !this.user.email.match(regExpr) ? 'Invalid email!\n' : ''; // Added newline
    },
  },
}
</script>


<style scoped>
.nice {
	margin: 0;
	padding: 0;
	font-family: sans-serif;
	background: linear-gradient(#2d343f, #254e7b);
}
</style>
