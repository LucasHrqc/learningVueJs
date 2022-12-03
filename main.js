const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: true,
        }
    },
    methods: {
        addCart(id){
            this.cart.push(id);
        },
        removeCart(id){
            this.cart.splice(id,1);
        }
    },
})
