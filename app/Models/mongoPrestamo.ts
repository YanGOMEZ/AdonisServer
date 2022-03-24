import {Schema, model} from 'mongoose'

export default class PrestamoMongo{
    static Prestamos = new Schema({
        id: Number, libro_id: Number, id_cliente: Number, Fecha_Entrega: Date, Entregado: String
    })

    static prestamos:any=model('prestamos', this.Prestamos)
}