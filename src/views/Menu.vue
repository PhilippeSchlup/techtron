<template>
	<Header />

	<!--<div v-if="isMessageTime" class="algo center" id="typping"></div>-->

	<div>
		<div class="center-container moving-container" @click="toggleAnimation">
			<img  :src="'images/rotate_logo.png'" alt="rotate-logo" class="rotating-image"
				:style="{ animationPlayState: isAnimationPaused ? 'paused' : 'running' }" />

		</div>
		<div class="center-container" style="top: 60%;">
			<button type="submit" name="go" style="color: rgb(255, 255, 255); background-color: black;"
				@click="this.$router.push('/products')">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				Shop Now!
			</button>
		</div>
	</div>

	<Footer />
</template>
  
<script>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import { ref } from "vue";

import { useBasketStore } from "@/store/basket";
import { useProductsStore } from "@/store/products";
import { useUserStore } from "@/store/user";

export default {
	setup() {
		const basketStore = useBasketStore();
		const productsStore = useProductsStore();
		const userStore = useUserStore();

		const isAnimationPaused = ref(false);

		const toggleAnimation = () => {
			isAnimationPaused.value = !isAnimationPaused.value;
		};

		return { basketStore, productsStore, userStore, toggleAnimation, isAnimationPaused };
	},
	components: {
		Footer,
		Header,
	},
	data() {
		return {
			products: [],
			isMessageTime: true,
		};
	},
	mounted() {
		//this.typer();
	},
	methods: {
		/*typer: function () {
			var i = 0;
			var speed = 55;
			var message = "Welcome to TechTron!\nWe hope you buy a lot! :)";

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

			var timeleft = 4; // Set the time in seconds
			var downloadTimer = setInterval(() => {
				if (timeleft <= 0) {
					clearInterval(downloadTimer); // Stop the timer
					document.getElementById("typping").innerHTML = ""; // Clear the content
					this.isMessageTime = false;
				}
				timeleft -= 1;
			}, 1000);
		},*/
	},
	computed: {},
};
</script>
  
<style scoped>
.nice {
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0%;
	left: 0%;


	background-size: cover;
	background-repeat: no-repeat;
	background-position: 50% 50%;
}

.center-container {
	margin: 0;
	position: absolute;
	left: 50%;
	top: 47.5%;
	transform: translate(-50%, -50%);
}

.moving-container {
	cursor: pointer;
	/* Add cursor pointer for the clickable effect */
}

.rotating-image {
	width: 100px;
	height: 100px;
	animation: rotate 5s linear infinite;
	/* Adjust the duration and timing function as needed */
}

.rotating-image:hover {
	animation-play-state: paused;
	/* Stop the rotation on hover */
}


@keyframes rotate {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}

/*_____________________Button_________________________*/
button {
	position: relative;
	display: inline-block;
	padding: 0px 10px;
	color: #03e9f4;
	font-size: 16px;
	text-decoration: none;
	text-transform: uppercase;
	overflow: hidden;
	transition: .5s;
	margin-top: 5px;
	border-radius: 5px;
	letter-spacing: 4px
}

button:hover {
	background: #03e9f4;
	color: #fff;
	box-shadow: 0 0 5px #03e9f4,
		0 0 25px #03e9f4,
		0 0 50px #03e9f4,
		0 0 100px #03e9f4;
}

button span {
	position: absolute;
	display: block;
}

button span:nth-child(1) {
	top: 0;
	left: -100%;
	width: 100%;
	height: 2px;
	background: linear-gradient(90deg, transparent, #03e9f4);
	animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
	0% {
		left: -100%;
	}

	50%,
	100% {
		left: 100%;
	}
}

button span:nth-child(2) {
	top: -100%;
	right: 0;
	width: 2px;
	height: 100%;
	background: linear-gradient(180deg, transparent, #03e9f4);
	animation: btn-anim2 1s linear infinite;
	animation-delay: .25s
}

@keyframes btn-anim2 {
	0% {
		top: -100%;
	}

	50%,
	100% {
		top: 100%;
	}
}

button span:nth-child(3) {
	bottom: 0;
	right: -100%;
	width: 100%;
	height: 2px;
	background: linear-gradient(270deg, transparent, #03e9f4);
	animation: btn-anim3 1s linear infinite;
	animation-delay: .5s
}

@keyframes btn-anim3 {
	0% {
		right: -100%;
	}

	50%,
	100% {
		right: 100%;
	}
}

button span:nth-child(4) {
	bottom: -100%;
	left: 0;
	width: 2px;
	height: 100%;
	background: linear-gradient(360deg, transparent, #03e9f4);
	animation: btn-anim4 1s linear infinite;
	animation-delay: .75s
}

@keyframes btn-anim4 {
	0% {
		bottom: -100%;
	}

	50%,
	100% {
		bottom: 100%;
	}
}
</style>
  