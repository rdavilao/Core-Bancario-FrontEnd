import { LegalRepresentative } from './legalRepresentative';

export class Contributor{
    constructor(
        public tradeName: string,
        public bussinessName: string,
        public legalRepresentative: LegalRepresentative,
    ){}
}
