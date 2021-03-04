import { Address } from './address';
import { Phone } from './phone';
import { Contributor } from './contributor';

export class Client{
    constructor(
        public _id: string,
        public identification: string,
        public names: string,
        public surnames: string,
        public genre: string,
        public birthdate: Date,
        public addresses: Address[],
        public email: string,
        public phones: Phone[],
        public nationality: string,
        public contributor: Contributor
    ){}
}