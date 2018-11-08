export class Comida {
    constructor (
        public _id: string,
        public user: string,
        public platillos: string,
        public price: number,
        public side: string,
        public priceSide: number,
    ){}
}
