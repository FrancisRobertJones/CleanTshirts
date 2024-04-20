export class NewProduct {
    constructor(
        public _id: string,
        public name: string,
        public price: number,
        public description: string,
        public image: string,
        public status: string,
        public amountInStock: number,
        public category: string
    ) { }
}