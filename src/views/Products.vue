<template>
    <div id="app">
        <Header />
        <div class="content">
            <div class="dropdown">
                <button type="submit" name="go"
                    style="color: rgb(255, 255, 255); background-color: black; font-family: Verdana, Geneva, Tahoma, sans-serif;"
                    class="nav-link dropdown-toggle d-block m-auto mt-4" href="#" id="navbarDropdownMenuLink" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Category
                </button>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li v-for="categorie in categories" :key="categorie.id">
                        <label class="dropdown-item">
                            <input type="checkbox" class="mx-2" v-model="selectedCategories" :value="categorie.id" />
                            {{ categorie.name }}
                        </label>
                    </li>
                </ul>
            </div>
            <br>
            <div class="products-grid">
                <div v-for="product in filteredProducts" :key="product.id" class=""
                    style="width: 80%; margin-left: auto; margin-right: auto;">
                    <div class="well">
                        <div class="card-body image-container" style="text-align: left; font-size: large;"
                            @click="console.log(product.cat_id)">
                            <!--<img :src="`/src/assets/images/${product.image}`" alt="teclado">-->
                            <img :src="'images/' + product.image" alt="Product Image">
                            <!--<img :src="getProductImage(product.image)" alt="teclado">-->
                        </div>
                        <div class="teste">
                            <span>
                                {{ product.name }}
                                <p style="font-weight: 700; ">
                                    €{{ product.price }} <button type="submit" name="go"
                                        style="color: rgb(255, 255, 255); background-color: black;"
                                        @click="basketStore.incrementProduct(product.id, product.price)">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <i class="bi bi-cart2"></i>
                                    </button>
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <Footer />
    </div>
</template>
  
<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

import { useBasketStore } from '@/store/basket';
import { useProductsStore } from '@/store/products';
import { useCategoriesStore } from '@/store/categories';
import { useUserStore } from '@/store/user';

export default {
    setup() {
        const basketStore = useBasketStore();
        const productsStore = useProductsStore();
        const categoriesStore = useCategoriesStore();
        const userStore = useUserStore();

        return { basketStore, productsStore, categoriesStore, userStore };
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
            selectedCategories: [], // Array to store the selected category IDs
        };
    },
    watch: {
        selectedCategories: {
            handler(newValues) {
                console.log('Selected Categories:', newValues);
            },
            deep: true,
        },
    },
    async mounted() {
        this.basket = this.basketStore.getProducts; // Get products from the basket store
        await this.productsStore.fetchProducts(); // Call the correct method to fetch products
        await this.categoriesStore.getCategoriesDB(); // Fetch categories from Supabase
        this.user = this.userStore.getUser; // Get user data from the user store
        console.log('Products:', this.productsStore.getProducts); // Debugging line
    },
    methods: {
        getImageUrl(name) {
            return new URL(`../assets/images/${name}`, import.meta.url).href;
        },
    },
    computed: {
        categories() {
            return this.categoriesStore.getCategories; // Access the getter directly
        },
        filteredProducts() {
            const allProducts = this.productsStore.getProducts;
            if (!this.selectedCategories.length) {
                return allProducts; // Return all products if no category is selected
            }

            return allProducts.filter(product => this.selectedCategories.includes(product.cat_id));
        },
    },
};
</script>

  
<style scoped>
.products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    /* Adjust the gap as needed */
    width: 60%;
    margin-left: auto;
    margin-right: auto;
}

.container.text-center {
    padding: 0;
    border-radius: 4px;
    width: 80%;
}

.custom-header {
    background: linear-gradient(#141e30, #243b55);
    color: white;
    font-weight: normal;
    padding: 10px;
    border-radius: 4px;
    width: auto;
}

.teste {
    background: linear-gradient(#dbe0eb, #95afcc);
    padding: 10px;
    color: #201c1c;
    border-radius: 0px 0px 4px 4px;
}


.well {
    margin-bottom: 30px;
    border-radius: 5px;
    
    transition: all 0.15s ease-in-out;
    background-color: rgb(255, 255, 255);

}

.well:hover {

    box-shadow: 0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(153, 0, 0, 0.8);

}

img {
    width: 150px;
    height: 100px;
    object-fit: scale-down;
}

.image-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

#app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
}

.content {
    flex: 1;
}

footer {
    color: aliceblue;
    padding: 10px;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
}




/*__________________________Button____________________________________*/
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
  