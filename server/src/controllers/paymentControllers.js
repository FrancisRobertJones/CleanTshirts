const initStripe = require("../utils/stripeinit")

class PaymentController {
    constructor() {
    }


    createSession = async (req, res) => {
        const stripe = initStripe()
        const totalPrice  = req.body
        const userId = req.session.user.userId;


        console.log("here is the total price!", totalPrice, "here is the user", userId)

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: 'sek',
                    product_data: {
                        name: 'Total Cart Charge',
                    },
                    unit_amount: Math.round(totalPrice * 100)
                },
                quantity: 1
            }],
            //TODO FIX CUSTOMER, REASIGN ORDER CREATION INTO CHECKOUT ALONGSIDE STRIPE
            customer: userId,
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost.5173",
        })

        response.status(200).json({ url: session.url, sessionID: session.id })
    }
}

module.exports = PaymentController