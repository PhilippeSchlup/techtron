<template>
    <div>
        <Header />
        <div class="container mt-5 p-3 rounded cart" @click="console.log(basket)" style="height: auto;">
            <div class="row no-gutters" style="width: 650px; height: auto;">
                <div class="col-md-8">
                    <div class="product-details mr-2" style="width: 360px;">
                        <h6 class="mb-0">Shopping cart</h6>
                        <hr>
                        <div v-for="basketItem in basket" :key="basketItem.id">
                            <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                                <div class="d-flex flex-row">
                                    <img
                                        class="rounded"
                                        :src="'images/' + productsStore.getProduct(basketItem.id)?.image"
                                        width="60"
                                        style="object-fit: scale-down;"
                                    />
                                    <div class="ml-2">
                                        <span class="font-weight-bold d-block">{{ productsStore.getProduct(basketItem.id)?.name }}</span>
                                    </div>
                                </div>
                                <div class="d-flex flex-row align-items-center">
                                    <button class="quantity-button" @click="decrementQuantity(basketItem.id)">-</button>
                                    <span class="d-block ml-2 font-weight-bold">{{ basketItem.quantity }}</span>
                                    <button class="quantity-button" @click="incrementQuantity(basketItem.id, productsStore.getProduct(basketItem.id)?.price)">+</button>
                                    <span class="d-block ml-5 font-weight-bold">${{ productsStore.getProduct(basketItem.id)?.price }}</span>
                                    <i class="fa fa-trash-o ml-3 text-black-50" @click="removeItem(basketItem.id)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
					<div class="payment-info">
						<div class="d-flex justify-content-between align-items-center"><span>Payment details</span><img
								class="rounded" src="https://i.imgur.com/WU501C8.jpg" width="30"></div><span
							class="type d-block mt-3 mb-1" style="font-size: 14px;">Card type</span>
						<label class=""> <input type="radio" name="card" value="payment" checked> <span><img width="30"
									src="https://img.icons8.com/color/48/000000/mastercard.png" /></span> </label>

						<label class="" style=""> <input type="radio" name="card" value="payment"> <span><img width="30"
									src="https://img.icons8.com/officel/48/000000/visa.png" /></span> </label>

						<label class=""> <input type="radio" name="card" value="payment"> <span><img width="30"
									src="https://img.icons8.com/ultraviolet/48/000000/amex.png" /></span> </label>

						<div><label class="credit-card-label">Name on card</label><input style="height: 30px;" type="text"
								class="form-control credit-inputs" placeholder="Name"></div>
						<div><label class="credit-card-label">Card number</label><input style="height: 30px;" type="text"
								class="form-control credit-inputs" placeholder="0000 0000 0000 0000"></div>
						<div class="row">
							<div class="col-md-6"><label class="credit-card-label">Date</label><input style="height: 30px;"
									type="text" class="form-control credit-inputs" placeholder="12/24"></div>
							<div class="col-md-6"><label class="credit-card-label">CVV</label><input style="height: 30px;"
									type="text" class="form-control credit-inputs" placeholder="342"></div>
						</div>

						<div class="d-flex justify-content-between information" style="padding-top: 10px;">
							<span>Subtotal</span><span>${{ totalCartPrice }}</span>
						</div>
						<div class="d-flex justify-content-between information"><span>Shipping</span><span>$0.00</span>
						</div>
						<div class="d-flex justify-content-between information"><span>Total(Incl.
								taxes)</span><span>${{ totalCartPrice }}</span></div>
						<button class="btn btn-primary btn-block d-flex justify-content-center align-items-center mt-3"
							type="button" style="height: 30px;" @click="createOrder">
							<span style="margin-top: 0;">Order<i class="fa fa-long-arrow-right ml-1"></i></span>
						</button>
					</div>
				</div>
            </div>
        </div>
        <Footer />
    </div>
</template>
<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { useBasketStore } from '@/store/basket';
import { useOrdersStore } from '@/store/orders';
import { useProductsStore } from '@/store/products';
import { useUserStore } from '@/store/user';

export default {
    setup() {
        const basketStore = useBasketStore();
        const ordersStore = useOrdersStore();
        const productsStore = useProductsStore();
        const userStore = useUserStore();
        return { basketStore, ordersStore, productsStore, userStore };
    },
    components: {
        Footer,
        Header,
    },
    data() {
        return {
            basket: [],
            user: {
                id: '',
                name: '',
                email: '',
                session_id: '',
            },
        };
    },
    async mounted() {
        this.basket = this.basketStore.getProducts; // Ensure this method exists
        await this.productsStore.fetchProducts(); // Correctly fetch products from the store
        this.user = this.userStore.getUser; // Ensure this method exists and is valid
		//console.log('User after fetching:', this.user);
    },
    methods: {
        calculateTotalPrice() {
            return this.basket.reduce((total, item) => {
                const product = this.productsStore.getProduct(item.id); // Use products store
                const itemPrice = product ? parseFloat(product.price) * item.quantity : 0;
                return total + itemPrice;
            }, 0);
        },
		async createOrder() {
			// Ensure user is logged in
			if (!this.user || !this.user.id) {
				alert('You need to be logged in to place an order.');
				return;
			}

			//console.log('Auth User ID:', this.user.id);

			// Fetch the internal user ID (integer) using the Supabase auth user UUID
			const internalUserId = await this.userStore.fetchInternalUserId(this.user.id);
			if (!internalUserId) {
				alert('Failed to fetch internal user ID.');
				return;
			}

			// Fetch the status ID (ensure this returns the correct ID type)
			const statusId = await this.ordersStore.fetchStatusIdByName('Pending');
			if (!statusId) {
				alert('Failed to fetch status ID.');
				return;
			}

			// Prepare order details
			const totalPrice = this.calculateTotalPrice();
			
			const order = {
				user_id: internalUserId, // Use the internal user ID (integer)
				total: totalPrice,
				status_id: statusId, // Use the fetched status ID
				created_at: new Date().toISOString(),
			};

			// Add the order to the database
			const success = await this.ordersStore.addOrderDB(order);
			if (success) {
				// Fetch the order ID from the inserted order
				const orderId = success; // You need to implement this method

				// Add order items
				const orderItems = this.basketStore.getItems(); // Fetch items from the basket
				//console.log(orderItems);
				for (const item of orderItems) {
					console.log(item)
					const itemSuccess = await this.ordersStore.addOrderItemDB(orderId, item);
					console.log(itemSuccess);
					if (!itemSuccess) {
						alert('Error adding item to the order. Please try again.');
						return; // Stop execution if there's an error adding any item
					}
				}

				// Clear the basket after successfully adding order items
				this.basket = [];
				alert('Order placed successfully!');
			} else {
				alert('Error placing the order. Please try again.');
			}
		},


		incrementQuantity(idToIncrement, price) {
			console.log(price);
            this.basketStore.incrementProduct(idToIncrement, price);
        },
        decrementQuantity(idToDecrement) {
            this.basketStore.decrementProduct(idToDecrement);
        },
    },
    computed: {
        totalCartPrice() {
            return this.calculateTotalPrice();
        },
    },
};
</script>

<style scoped>
@media (min-width: 1025px) {
	.payment-info {
		background: blue;
		padding: 10px;
		border-radius: 6px;
		color: #fff;
		font-weight: bold;
		height: 420px;
		padding-left: 15px;
		padding-right: 15px;
	}

	.product-details {
		padding: 10px;
	}

	body {
		background: #eee;
	}

	.cart {
		background: #fff;
	}

	.p-about {
		font-size: 12px;
	}

	.table-shadow {
		-webkit-box-shadow: 5px 5px 15px -2px rgba(0, 0, 0, 0.42);
		box-shadow: 5px 5px 15px -2px rgba(0, 0, 0, 0.42);
	}

	.type {
		font-weight: 400;
		font-size: 10px;
	}

	label.radio {
		cursor: pointer;
	}

	label.radio input {
		position: absolute;
		top: 0;
		left: 0;
		visibility: hidden;
		pointer-events: none;
	}

	label.radio span {
		padding: 1px 12px;
		border: 2px solid #ada9a9;
		display: inline-block;
		color: #8f37aa;
		border-radius: 3px;
		text-transform: uppercase;
		font-size: 11px;
		font-weight: 300;
	}

	label.radio input:checked+span {
		border-color: #fff;
		background-color: blue;
		color: #fff;
	}

	.credit-inputs {
		background: rgb(102, 102, 221);
		color: #fff !important;
		border-color: rgb(102, 102, 221);
	}

	.credit-inputs::placeholder {
		color: #fff;
		opacity: 0.5;
		font-size: 13px;
	}

	.credit-card-label {
		font-size: 14px;
		font-weight: 300;
	}

	.form-control.credit-inputs:focus {
		background: rgb(102, 102, 221);
		border: rgb(102, 102, 221);
	}

	.line {
		border-bottom: 1px solid rgb(102, 102, 221);
	}

	.information span {
		font-size: 14px;
		font-weight: 500;
	}

	.information {
		margin-bottom: 5px;
	}

	.items {
		-webkit-box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.25);
		box-shadow: 5px 5px 4px -1px rgba(0, 0, 0, 0.08);
	}

	.spec {
		font-size: 11px;
	}

	.quantity-button {
		background-color: #4CAF50;
		/* Green background */
		border: none;
		color: white;
		padding: 5px 10px;
		/* Adjusted padding for smaller buttons */
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 12px;
		/* Adjusted font size for smaller buttons */
		margin: 4px 2px;
		cursor: pointer;
		border-radius: 4px;
		opacity: 0.9;
	}

	.quantity-button:hover {
		background-color: #45a049;
		/* Darker green on hover */
	}

	footer {
		position: relative;
	}
}
</style>