import {Schema, model} from 'mongoose'

export default class Mongobar{
    static Prestamos = new Schema({
        id: Number, partida: Number, jugador: Number, barco:Number,
        posicion: String, derribado: String
    })

    static prestamos:any=model('barcos', this.Prestamos)
}