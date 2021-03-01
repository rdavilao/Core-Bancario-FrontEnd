export class CreditCard{
    constructor(
        public COD_CARD: Number,
        public COD_ACCOUNT: Number,
        public NUMBER: string,
        public LIMIT_ACCOUNT: Number,
        public CVV: string,
        public EXPIRATION_DATE: Date,
        public CREATION_DATE: Date,
        public STATUS: string,
    ){}
}

export class CreditCardRQ{
    constructor(
        public number: string,
        public account: string,
        public limitAccount: Number,
        public expirationDate: Date,
        public balanceAccount: number,
    ){}
}