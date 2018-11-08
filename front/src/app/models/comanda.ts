export class Comanda {
    constructor (
        public _id: string,
        public user: string,
        public desayuno: string,
        public comida: string,
        public bebida: string,
        public total: number,
        public file: string,
        public created_at: string,

    ) {}
}
