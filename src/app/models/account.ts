export class Account{
    constructor(
        public COD_ACCOUNT: number,
        public TYPE: number,
        public CLIENT_IDENTIFICATION: string,
        public CREATION_DATE: Date,
        public NUMBER: string,
        public BALANCE: number,
        public STATUS: string,
    ){}
}
