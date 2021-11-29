const app = Vue.createApp({
    el: '#app',
    data() {
        return {
            cryptos: null,
            individual: null,
            lastPrice: 'btcusd',
            orderBook: 'btcusd',
            sellBuy: 'BUY',
            individualValue: 'USD',
        }
    },

    computed: {
        get_name: function () {
            if (this.individual === null) {
                return this.individual = 'BTC/USD'
            }
            else { 
                return this.individual;
            }
        },
    },

    methods: {
        select_crypto: function (event) {
            this.individual = event.target.value;

            this.individualValue = this.individual.slice(-4).replace(/\//g, "");

            const ticker = this.individual.toLowerCase().replace(/\//g, "");

            this.fetchPrice(ticker);
            this.fetchOrderBook(ticker);
        },

        sellBuyComponent: function (event) {
            this.sellBuy = event.target.value;
        },

        async fetchCryptos() {
            const res = await fetch('https://www.bitstamp.net/api/v2/trading-pairs-info');
            const namePairs = await res.json();

            this.cryptos = namePairs;
        },

        async fetchPrice(currentPair) {
            const res = await fetch(`https://www.bitstamp.net/api/v2/ticker_hour/${currentPair}`);
            const lastPairPrice = await res.json();

            this.lastPrice = lastPairPrice;
        },


        async fetchOrderBook(currentPair) {
            const res = await fetch(`https://www.bitstamp.net/api/v2/order_book/${currentPair}`);
            const orderBookPair = await res.json();

            this.orderBook = orderBookPair;
        },
    },

    mounted() {
        this.fetchCryptos();
        this.fetchPrice(this.lastPrice);
        this.fetchOrderBook(this.orderBook);
    },
})
app.mount('#app')