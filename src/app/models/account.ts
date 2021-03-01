export class Account{
    constructor(
        public COD_ACCOUNT: Number,
        public TYPE: Number,
        public CLIENT_IDENTIFICATION: string,
        public CREATION_DATE: Date,
        public NUMBER: string,
        public BALANCE: number,
        public STATUS: string,
    ){}
}