export class NewProductDetails {
    constructor(
        public name: string,
        public price: number,
        public description: string,
        public image: string,
        public status: boolean,
        public amountInStock: number,
        public category: string
    ) { }
}
