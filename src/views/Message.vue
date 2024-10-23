<template>
	<div class="container center" id="typping">
	  <!-- The message will display here as it's typed out -->
	</div>
  </template>
  
  <script>
  import { supabase } from '@/supabase' // Import Supabase client
  
  export default {
	data() {
	  return {
		message: '',
		countdown: 3,
	  }
	},
  
	mounted() {
	  this.performActionBasedOnId()
	},
  
	methods: {
	  goToTable() {
		this.$router.push('/')
	  },
  
	  async performActionBasedOnId() {
		const actionId = this.$route.params.id;
  
		switch (actionId) {
		  case '1':
			await this.someSupabaseOperation(); // Example operation
			this.message = "Success: don't know";
			break;
		  case '2':
			await this.anotherSupabaseOperation(); // Another example operation
			this.message = "Success: Yet to know";
			break;
		  case '3':
			await this.addOrderToDatabase(); // Add order
			break;
		  case '4':
			await this.registerUser(); // Register user
			break;
		  case '5':
			this.message = "Welcome back!"; // Static welcome message
			break;
		  case '6':
			this.message = "Bye, see you soon! :)"; // Static goodbye message
			break;
		  case '7':
			await this.addSomethingToDatabase(); // Another operation
			this.message = "Success: Something added to database";
			break;
		  default:
			this.message = "Unknown action";
		}
  
		this.typer(); // Start typing effect
		this.startCountdown(); // Start countdown
	  },
  
	  async someSupabaseOperation() {
		// Replace this with an actual Supabase operation
		const { data, error } = await supabase
		  .from('your_table')
		  .insert([{ your_column: 'value' }]); // Example insert operation
  
		if (error) {
		  console.error('Error:', error);
		  this.message = 'Operation failed: ' + error.message;
		} else {
		  this.message = 'Operation succeeded!';
		}
	  },
  
	  async anotherSupabaseOperation() {
		// Another operation, like fetching data
		const { data, error } = await supabase
		  .from('another_table')
		  .select('*');
  
		if (error) {
		  console.error('Error:', error);
		  this.message = 'Failed to fetch data: ' + error.message;
		} else {
		  this.message = 'Data fetched successfully!';
		}
	  },
  
	  async addOrderToDatabase() {
		// Replace with actual order adding logic
		const { data, error } = await supabase
		  .from('orders')
		  .insert([{ item: 'New Order', quantity: 1 }]);
  
		if (error) {
		  console.error('Error:', error);
		  this.message = 'Failed to add order: ' + error.message;
		} else {
		  this.message = 'Order added to database!';
		}
	  },
  
	  async registerUser() {
		// Example user registration logic
		const { user, error } = await supabase.auth.signUp({
		  email: 'user@example.com', // Replace with actual email
		  password: 'password', // Replace with actual password
		});
  
		if (error) {
		  console.error('Registration error:', error);
		  this.message = 'Registration failed: ' + error.message;
		} else {
		  this.message = 'User registered successfully!';
		}
	  },
  
	  async addSomethingToDatabase() {
		// Replace with actual logic
		const { data, error } = await supabase
		  .from('your_table')
		  .insert([{ your_column: 'value' }]);
  
		if (error) {
		  console.error('Error:', error);
		  this.message = 'Failed to add: ' + error.message;
		} else {
		  this.message = 'Added successfully!';
		}
	  },
  
	  startCountdown() {
		this.countdown = 3; // Set initial countdown value
		const timer = setInterval(() => {
		  this.countdown--;
		  if (this.countdown <= 0) {
			clearInterval(timer);
			this.goToTable(); // Redirect after countdown
		  }
		}, 1000);
	  },
  
	  typer() {
		const element = document.getElementById("typping");
		let i = 0;
		const speed = 55; // Speed of typing effect
  
		const typeWriter = () => {
		  if (i < this.message.length) {
			element.innerHTML += this.message.charAt(i);
			i++;
			setTimeout(typeWriter, speed);
		  }
		};
  
		typeWriter(); // Start typing effect
	  },
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