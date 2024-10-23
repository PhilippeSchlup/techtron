<template>
  <div>

    <Header />

    <div>
      <div v-for="order in orders" :key="order.id" class="card" style="margin-top: 10px;">
        <div class="title">Your order</div>
        <div class="info">
          <div class="row">
            <div class="col-7">
              <span id="heading">Date</span><br>
              <span id="details">{{ order.created_at }}</span>
            </div>
            <div class="col-5 pull-right">
              <span id="heading">Order No.</span><br>
              <span id="details">{{ order.id }}</span>
            </div>
          </div>
        </div>
        <div v-for="orderItem in order.items" :key="orderItem.product_id" class="pricing" @click="console.log(orderItem)">
          <div class="row">
            <div class="col-9">
              <span id="name">{{ orderItem.name }}</span>
            </div>
            <div class="col-3">
              <span id="price">&pound;{{ orderItem.price }}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-9">
              <span id="name">Shipping</span>
            </div>
            <div class="col-3">
              <span id="price">&pound;00.00</span>
            </div>
          </div>
        </div>
        <div class="total">
          <div class="row">
            <div class="col-9"></div>
            <div class="col-3 total-amount">&pound;{{ order.total }}</div>
          </div>
        </div>
        <div class="tracking">
          <div class="title">Tracking Order</div>
        </div>
        <div class="progress-track">
          <ul id="progressbar">
            <li :class="getStatusClass(order.status_id, 1)" id="step1" style="text-align: left;">Ordered</li>
            <li :class="getStatusClass(order.status_id, 2)" id="step2" class="step0" style="text-align: left;">Shipped</li>
            <li :class="getStatusClass(order.status_id, 3)" id="step3" class="step0" style="text-align: right;">On the way</li>
            <li :class="getStatusClass(order.status_id, 4)" id="step4" class="step0" style="text-align: right;">Delivered</li>
          </ul>
        </div>


        <div class="footer">
          <div class="row">
            <div class="col-2"><img class="img-fluid"  :src="'images/rotate_logo.png'"></div>
            <div class="col-10">Want any help? Please &nbsp;<a> contact us</a></div>
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

import { useOrdersStore } from '@/store/orders';
import { useUserStore } from '@/store/user';

export default {
  setup() {
    const ordersStore = useOrdersStore();
    const userStore = useUserStore();
    return { ordersStore, userStore };
  },
  components: {
    Footer,
    Header,
  },
  data() {
    return {
      isHidden: false,
      orders: [],
      user: {
        id: '',
        name: '',
        email: '',
        session_id: '',
      },
    };
  },
  async mounted() {
    this.user = this.userStore.getUser; 
  
    if (this.user) { 
      await this.ordersStore.getMyOrdersDB(); // Fetch orders from Supabase
      this.orders = this.ordersStore.getOrders; // Get the orders from the orders store
    } else {
      console.warn('User not logged in; cannot fetch orders.');
    }
    console.log(this.orders); 
  },
  methods: {
    getStatusClass(currentStatus, step) {
      // If the current step is less than or equal to the order's status_id, mark it as active
      return currentStatus >= step ? 'step0 active' : 'step0';
    },
  },
  computed: {
   
  },
};
</script>


<style scoped>

footer{
  position: relative;
}
.total-amount {
  font-size: 1.5em;
}

body {
  background: #ddd3;
  height: 100vh;
  vertical-align: middle;
  display: flex;
  font-family: Muli;
  font-size: 14px;
}

.card {
  margin: auto;
  width: 38%;
  max-width: 600px;
  padding: 4vh 0;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-top: 3px solid linear-gradient(#141e30, #243b55);
  border-bottom: 3px solid linear-gradient(#141e30, #243b55);
  border-left: none;
  border-right: none;
}

@media(max-width:768px) {
  .card {
    width: 90%;
  }
}

.title {
  color: linear-gradient(#141e30, #243b55);
  font-weight: 600;
  margin-bottom: 2vh;
  padding: 0 8%;
  font-size: initial;
}

#details {
  font-weight: 400;
}

.info {
  padding: 5% 8%;
}

.info .col-5 {
  padding: 0;
}

#heading {
  color: grey;
  line-height: 6vh;
}

.pricing {
  background-color: #ddd3;
  padding: 2vh 8%;
  font-weight: 400;
  line-height: 2.5;
}

.pricing .col-3 {
  padding: 0;
}

.total {
  padding: 2vh 8%;
  color: linear-gradient(#141e30, #243b55);
  font-weight: bold;
}

.total .col-3 {
  padding: 0;
}

.footer {
  padding: 0 8%;
  font-size: x-small;
  color: black;
}

.footer img {
  height: 5vh;
  opacity: 0.5;
}

.footer a {
  color: linear-gradient(#141e30, #243b55);
}

.footer .col-10,
.col-2 {
  display: flex;
  padding: 3vh 0 0;
  align-items: center;
}

.footer .row {
  margin: 0;
}

#progressbar {
  margin-bottom: 3vh;
  overflow: hidden;
  color: linear-gradient(#141e30, #243b55);
  padding-left: 0px;
  margin-top: 3vh
}

#progressbar li {
  list-style-type: none;
  font-size: x-small;
  width: 25%;
  float: left;
  position: relative;
  font-weight: 400;
  color: rgb(160, 159, 159);
}

#progressbar #step1:before {
  content: "";
  color: linear-gradient(#141e30, #243b55);
  width: 5px;
  height: 5px;
  margin-left: 0px !important;
  /* padding-left: 11px !important */
}

#progressbar #step2:before {
  content: "";
  color: #fff;
  width: 5px;
  height: 5px;
  margin-left: 32%;
}

#progressbar #step3:before {
  content: "";
  color: #fff;
  width: 5px;
  height: 5px;
  margin-right: 32%;
  /* padding-right: 11px !important */
}

#progressbar #step4:before {
  content: "";
  color: #fff;
  width: 5px;
  height: 5px;
  margin-right: 0px !important;
  /* padding-right: 11px !important */
}

#progressbar li:before {
  line-height: 29px;
  display: block;
  font-size: 12px;
  background: #ddd;
  border-radius: 50%;
  margin: auto;
  z-index: -1;
  margin-bottom: 1vh;
}

#progressbar li:after {
  content: '';
  height: 2px;
  background: #ddd;
  position: absolute;
  left: 0%;
  right: 0%;
  margin-bottom: 2vh;
  top: 1px;
  z-index: 1;
}

.progress-track {
  padding: 0 8%;
}

#progressbar li:nth-child(2):after {
  margin-right: auto;
}

#progressbar li:nth-child(1):after {
  margin: auto;
}

#progressbar li:nth-child(3):after {
  float: left;
  width: 68%;
}

#progressbar li:nth-child(4):after {
  margin-left: auto;
  width: 132%;
}

#progressbar li.active {
  color: black;
}

#progressbar li.active:before,
#progressbar li.active:after {
  background: linear-gradient(#141e30, #243b55);
}
</style>