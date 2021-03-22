export class CreditCard{
    constructor(
        public COD_CARD: number,
        public COD_ACCOUNT: number,
        public NUMBER: string,
        public LIMIT_ACCOUNT: number,
        public CVV: string,
        public EXPIRATION_DATE: Date,
        public CREATION_DATE: Date,
        public STATUS: string,
    ){}
}

export class CreditCardRQ{
    constructor(
        public numberCreditCard: string,
        public account: string,
        public limitAccount: number,
        public expirationDate: Date,
        public balanceAccount: number,
    ){}
}
