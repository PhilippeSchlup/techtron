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
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

import { useUserStore } from '@/store/user'

export default {

	setup() {
		const userStore = useUserStore()
		return { userStore }
	},

	components: {
		Footer,
		Header
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
		}
	},

	mounted() {
		this.user = this.userStore.getUser;
	},

	methods: {
		handleSubmit: function () {
			this.submitting = true;

			// Call validation functions and store error messages
			const nameError = this.invalidName();
			const emailError = this.invalidEmail();
			const passwordError = this.invalidPassword();
			const passwordConfirmationError = this.invalidPasswordConfirmation();

			// Concatenate error messages
			this.error = nameError + emailError + passwordError + passwordConfirmationError;

			// Check if there are any errors
			if (this.error !== '') {
				return;
			}

			this.userStore.userExistsDB(this.user).then(
				result => {
					if (result) {
						alert("This email already exists in the DB!");
					} else {
						this.userStore.addUserDB();
						this.$router.push("/message/4");
					}
				}
			);
		},

		cancel() {
			this.$router.push('/')
		},
		invalidName: function () {
			if (this.user.name === '') return 'Invalid name!'
			else return ''
		},

		invalidPassword: function () {
			if (this.user.password === '' || this.user.password.length < 8) return 'Password too short, it has to be at least 8 characters!'
			else return ''
		},

		invalidPasswordConfirmation: function () {
			if (this.user.password !== this.passwordConfirmation) return 'Password do not match!'
			else return ''
		},

		invalidEmail: function () {
			const regExpr = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
			if (!this.user.email.match(regExpr)) return 'Invalid email!'
			else return ''
		},
	},

	computed: {

	},

	directives: {

	},

	created: function () {


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
</style>
