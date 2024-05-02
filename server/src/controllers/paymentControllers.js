const initStripe = require("../utils/stripeinit")
const AuthService = require("../repositories/authRepository")

class PaymentController {
    constructor() {
        this.authService = new AuthService()
    }

    createSession = async (req, res) => {
        const stripe = initStripe()
        const { totalPrice } = req.body
        console.log("total price is>>>", totalPrice)
        const stripeUnit = Math.round(Number(totalPrice) * 100)
        const userId = req.session.user.userId;
        const user = await this.authService.findUser(userId)
        const stripeId = user["stripeId"].id
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: 'sek',
                    product_data: {
                        name: 'Total Cart Charge',
                    },
                    unit_amount: stripeUnit
                },
                quantity: 1
            }],
            customer: stripeId,
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost.5173",
        })

        res.status(200).json({ url: session.url, sessionID: session.id })
    }

    verifyPayment = async (req, res) => {
        const stripe = initStripe();
        const { stripeId } = req.body
        console.log(stripeId, "here is the sessionid")

        const session = await stripe.checkout.sessions.retrieve(stripeId)
        console.log(session, "here is the session")
        /*         session.payment_status === "paid" ? 
         */
    }
}

module.exports = PaymentController