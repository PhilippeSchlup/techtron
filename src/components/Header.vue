<template>
	<nav class="navbar navbar-expand-lg navbar-dark p-1" id="headerNav" style="background-color:black; height: 90px;">
	  <div class="container-fluid">
		<div class="collapse navbar-collapse" id="navbarNavDropdown">
		  <ul class="navbar-nav mx-auto">
			<li class="nav-item">
			  <router-link class="nav-link mx-2" aria-current="page" to="/">Home</router-link>
			</li>
			<li class="nav-item">
			  <router-link class="nav-link mx-2" to="/products">Products</router-link>
			</li>
			<li class="nav-item d-none d-lg-block">
			  <router-link class="nav-link mx-2" to="/">
				<img :src="'images/tech_logo.png'" height="60" />
			  </router-link>
			</li>
			<li class="nav-item">
			  <a class="nav-link mx-2" href="#">Pricing</a>
			</li>
			<li class="nav-item dropdown">
			  <a class="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
				data-bs-toggle="dropdown" aria-expanded="false">
				User
			  </a>
			  <ul v-if="!user" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
				<li><router-link class="dropdown-item" to="/login">Login</router-link></li>
				<li><router-link class="dropdown-item" to="/register">Register</router-link></li>
				<li><router-link class="dropdown-item" to="/basket">Basket <i class="bi bi-cart2"></i>({{ totalBasketItems }})</router-link></li>
			  </ul>
			  <ul v-else class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
				<li><router-link class="dropdown-item" to="/">Welcome {{ user.user_metadata.name }}</router-link></li>
				<li><router-link class="dropdown-item" to="/basket">Basket <i class="bi bi-cart2"></i>({{ totalBasketItems }})</router-link></li>
				<li><router-link class="dropdown-item" to="/myorders">Your Orders <i class="bi bi-truck"></i></router-link></li>
				<li><a class="dropdown-item" @click="logout">Logout <i class="bi bi-box-arrow-right"></i></a></li>
			  </ul>
			</li>
		  </ul>
		</div>
	  </div>
	</nav>
  </template>
  
  <script>
  import { supabase } from '@/supabase'; // Import your Supabase client
  import { useBasketStore } from '@/store/basket';
  
  export default {
	setup() {
	  const basketStore = useBasketStore();
	  return { basketStore };
	},
  
	data() {
	  return {
		basket: [],
		user: null, // Initialize user as null
	  };
	},
  
	mounted() {
	  this.basket = this.basketStore.getProducts;
	  this.fetchUser(); // Fetch user from Supabase
	},
  
	methods: {
	  async fetchUser() {
		const { data: { user }, error } = await supabase.auth.getUser(); // Get the user from Supabase
		if (error) {
		  console.error('Error fetching user:', error);
		} else {
		  this.user = user; // Set user state
		}
	  },
  
	  async logout() {
		const { error } = await supabase.auth.signOut(); // Log out user via Supabase
		if (error) {
		  console.error('Logout error:', error);
		} else {
		  this.user = null; // Clear user state
		  this.$router.push('/message/6'); // Redirect after logout
		}
	  },
	},
  
	computed: {
	  totalBasketItems() {
		const basket = this.basketStore.getProducts;
		return basket ? basket.reduce((total, item) => total + item.quantity, 0) : 0; // Calculate total basket items
	  },
	},
  };
  </script>
  