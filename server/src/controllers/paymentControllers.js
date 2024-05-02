const initStripe = require("../utils/stripeinit")
const AuthService = require("../repositories/authRepository")
const AuthRepository = require("../repositories/authRepository")
const Order = require("../classes/Order")

class PaymentController {
    constructor() {
        this.authService = new AuthService()
        this.authRepository = new AuthRepository()
        this.order = new Order()
    }

    createSession = async (req, res) => {
        const stripe = initStripe()
        const { totalPrice } = req.body
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
        user.sessionID = session.id
        const updates = { sessionId: user.sessionID }
        await this.authRepository.updateUser(userId, updates)
        res.status(200).json({ url: session.url, sessionId: session.id })
    }

    verifyPayment = async (req, res) => {
        const stripe = initStripe();
        const { sessionId } = req.body
        const session = await stripe.checkout.sessions.retrieve(sessionId)
        console.log(session, "here is the session")
        if (session.payment_status === "paid") {
            let idData = {sessionId: sessionId}
            let data = {status: "paid"}
            await this.order.updateOne(idData, data)
            console.log("order status updated.")
        }
    }
}

module.exports = PaymentController