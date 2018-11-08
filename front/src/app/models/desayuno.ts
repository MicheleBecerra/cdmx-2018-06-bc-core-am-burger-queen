export class Desayuno{
    constructor (
        public _id: string,
        public user: string,
        public platillo: string,
        public price: number,
    ){}
}






const desayunoSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User'},
    platillos:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
})