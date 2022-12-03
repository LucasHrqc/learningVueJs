app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: 
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image" alt="">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In stock</p>
        <p v-else">Out of stock!</p>

        <p>Shipping: {{shipping}}</p>
        <ul>
          <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div 
        v-for="(variant,index) in variants" 
        :key="variant.id" 
        @mouseover="updateVariant(index)" 
        class="color-circle" 
        :style="{backgroundColor: variant.color}">
        </div>
        <button class="button" :class="{ disabledButton: !inStock }" :disabled="!inStock" @click="addToCart">Add to Cart</button>
        <button class="button" :class="{ disabledButton: cart == 0 }" :disabled="cart == 0" @click="removeFromCart">Remove</button>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview" ></review-form>
    </div>
  </div>`,
  data() {
    return {
        product: 'Boots',
        selectedVariant: 0,
        brand: 'Luldc',
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            {id: 2234, color: '#1C834E', image: './assets/images/socks_green.jpg', quantity: 50},
            {id: 2235, color: '#32465F', image: './assets/images/socks_blue.jpg', quantity: 0}
        ],
        reviews: []
    }
},
methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
        this.$emit('remove-from-cart', this.selectedVariant);
    },
    updateVariant(index) {
        this.selectedVariant = index;
    },
    addReview(review){
        this.reviews.push(review);
    }
},
computed: {
    title() {
        return this.brand + ' ' + this.product
    },
    image() {
        return this.variants[this.selectedVariant].image
    },
    inStock(){
        return this.variants[this.selectedVariant].quantity;
    },
    shipping(){
        return this.premium ? 'Free' : 2.99;
    }
}
})