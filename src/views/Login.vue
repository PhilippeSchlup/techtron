<template>
	<div class="nice">



		<Header />


		<div class="login-box">
			<h2>Login</h2>
			<form @submit.prevent="handleSubmit">
				<div class="user-box">
					<input type="email" name="email" required="" v-model="user.email" @focus="this.error = false">
					<label>Email</label>
				</div>
				<div class="user-box">
					<input type="password" name="password" required="" v-model="user.password" @focus="this.error = false">
					<label>Password</label>
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
				email: '',
				password: '',
			},
			submitting: false,
			error: '',
		}
	},

	methods: {
		handleSubmit: function () {
			this.submitting = true

			if (this.user.password === '' || this.user.email === '') {
				this.error = 'Please complete all required fields!'
				return
			}

			this.userStore.loginUserDB(this.user).then(
				result => {
					if (result) {
						this.$router.push("/message/5")
					}
				}
			)
		},
	},

	computed: {

	},
	directives: {

	},
	created: function () {
		this.submitting = false
		this.error = false
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