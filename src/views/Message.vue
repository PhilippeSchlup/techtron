<template>
	<div class="container center" id="typping">
		
	</div>
</template>

<script>


import { useUserStore } from '@/store/user'


export default {

	setup() {
		const userStore = useUserStore()
		return { userStore }
	},

	data() {
		return {
			message: '',
			countdown: 3
		}
	},
	mounted() {
		this.setMessage()
		this.typer()
	},


	methods: {
		goToTable() {
			this.$router.push('/')
		},
		setMessage() {
			if (this.$route.params.id == 1) {
				this.message = "Success: don't know"
			}
			if (this.$route.params.id == 2) {
				this.message = "Success: Yet to know"
			}
			if (this.$route.params.id == 3) {
				this.message = "Success: Order added to database"
			}
			if (this.$route.params.id == 4) {
				this.message = "Success: You are now registered"
			}
			if (this.$route.params.id == 5) {
				this.message = "Welcome back " + this.userStore.getUser.name + "!"
			}
			if (this.$route.params.id == 6) {
				this.message = `Bye ${this.userStore.user.name}, see you soon! :)`
			}
			if (this.$route.params.id == 7) {
				this.message = "Success: Somethong added to database"
			}

			/*var timeleft = 2;
			var downloadTimer = setInterval(() => {
				if (timeleft <= 0) {
					clearInterval(downloadTimer)
					this.$router.push('/')
				}
				timeleft -= 1
			}, 1000)*/
			var timeleft = 2;
			var downloadTimer = setInterval(() => {
				if (timeleft <= 0) {
					clearInterval(downloadTimer)
					this.$router.push('/')
				}
				timeleft -= 1
				this.countdown -= 1
			}, 1000)
		},

		typer: function () {
			var i = 0;
			var speed = 55;
			var message = this.message;

			// Define typer function inside the scope
			function typeWriter() {
				if (i < message.length) {
					document.getElementById("typping").innerHTML += message.charAt(i);
					i++;
					setTimeout(typeWriter, speed);
				}
			}

			// Call the typer function
			typeWriter();
		}

	},

}
</script>

<style scoped>
.logout {
	margin: 0 auto;
	max-width: 800px;
}

.success-message {
	color: #32a95d;
}

.error-message {
	color: #d33c40;
}

.container.center {
	margin: 0;
	position: absolute;
	left: 50%;
	top: 47.5%;
	transform: translate(-50%, -50%);
	background-color: white;
	width: auto;
	border-radius: 4px;
	box-shadow: 0px 3px 8px 1px rgba(0, 0, 0, 0.2);
	height: auto;
	text-align: center;
	vertical-align: middle;
	font-size: 36px;
	font-family: 'Times New Roman', Times, serif;
}
</style>