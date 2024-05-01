const Stripe = require('stripe');

const initStripe = () => {
    if (!process.env.STRIPE_API_KEY) {
        throw new Error("stripe API key is missing")
    }
    return new Stripe(process.env.STRIPE_API_KEY, {
        apiVersion: '2023-10-16'
    })
}



module.exports = initStripe