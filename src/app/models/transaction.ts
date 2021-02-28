export class Transaction{
    constructor(
        public _id: string,
        public identification: string,
        public account: string,
        public creationDate: Date,
        public type: string,
        public description: string,
        public mont: number,
        public balanceAccount: number,
    ){}
}