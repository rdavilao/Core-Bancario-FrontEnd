export class Address{
    constructor(
        public type: string,
        public mainStreet: string,
        public sideStreet: string,
        public number: string,
        public reference: string,
        public province: string,
        public canton: string,
        public parish: string
    ){}
}