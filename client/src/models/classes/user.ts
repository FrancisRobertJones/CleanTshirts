export class User {
    constructor(
        public userId: string,
        public address: string,
        public state: string,
        public country: string,
        public postcode: string
    ){}
}


/* export class OrderData {
    constructor(
        public UserData: User | null,
        public cartItemsForStripe: CartItemForStripe[] | null
    ){}
} */