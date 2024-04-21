export class AccountCreation {
    constructor(
        public email: string,
        public password: string,
        public address: string,
        public state: string,
        public country: string,
        public postcode: number
    ) {}
}

export class PasswordCheck {
    constructor(
        public password1: string,
        public password2: string,
        public matches: boolean
    ){}
}