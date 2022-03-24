import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Prestamo from 'App/Models/Prestamo';

export default class PrestamosController {
    public async index({response}:HttpContextContract){
        try{
            const prestamo = await Database.query().from('prestamos')
            .innerJoin('libro', 'prestamos.libro', 'libro.id')
            .innerJoin('usuarios', 'prestamos.cliente', 'usuarios.id')
            .select('prestamos.id','prestamos.libro as libro_id','libro.titulo'
            ,'prestamos.cliente as id_cliente', 'usuarios.nombre as cliente','prestamos.created_at', 
            'prestamos.updated_at','prestamos.Fecha_Entrega',
            'prestamos.Entregado')
            return prestamo
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Busprest({params, response}:HttpContextContract){
        try{
            const prestamo = await Database.query().from('prestamos')
            .innerJoin('libro', 'prestamos.libro', 'libro.id')
            .innerJoin('usuarios', 'prestamos.cliente', 'usuarios.id')
            .select('prestamos.id','prestamos.libro as libro_id','libro.titulo'
            ,'prestamos.cliente as id_cliente', 'usuarios.nombre as cliente','prestamos.created_at', 
            'prestamos.updated_at','prestamos.Fecha_Entrega',
            'prestamos.Entregado').where('prestamos.id', params.id)
            return prestamo
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Usprest({params, response}:HttpContextContract){
        try{
            const prestamo = await Database.query().from('prestamos')
            .innerJoin('libro', 'prestamos.libro', 'libro.id')
            .innerJoin('usuarios', 'prestamos.cliente', 'usuarios.id')
            .select('prestamos.id','prestamos.libro as libro_id','libro.titulo'
            ,'prestamos.cliente as id_cliente', 'usuarios.nombre as cliente','prestamos.created_at', 
            'prestamos.updated_at','prestamos.Fecha_Entrega',
            'prestamos.Entregado').where('prestamos.cliente', params.id)
            return prestamo
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    //CREAR NUEVO AUTOR
    public async store({request, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const libro = request.input('libro');
            const cliente = request.input('cliente');
            const Fecha_Entrega = request.input('fecha_entrega');
            const Entregado = 'NO'
            const prestamo = await Prestamo.create({libro, cliente, Fecha_Entrega, Entregado});

            const mongoose = require('mongoose')
            const db = mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')
            const prestamos = db.model('prestamos',{id: Number, libro_id: Number, id_cliente: Number, Fecha_Entrega: Date, Entregado: String})

            const pre = new prestamos({id: prestamo.id, libro_id: prestamo.libro, id_cliente: prestamo.cliente, Fecha_Entrega: prestamo.Fecha_Entrega, Entregado: prestamo.Entregado})

            pre.save().then(() => console.log('creado'))

            db.close()

            return prestamo
        }
        catch{
            response.badRequest('ERROR AL GUARDARO PRESTAMO')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({params,response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const prestamo = await Prestamo.findOrFail(params.id)
            prestamo.Entregado = 'SÍ'
            await prestamo.save();
            return prestamo
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR PRESTAMO')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const prestamo = await Prestamo.findOrFail(params.id);
            await prestamo.delete();
            return prestamo
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL PRESTAMO')
        }
    }
}
