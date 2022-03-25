import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Prestamo from 'App/Models/Prestamo';
import mongoose from 'mongoose';
import PrestamoMongo from 'App/Models/mongoPrestamo';
import Libro from 'App/Models/Libro'

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

            await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')

            const pre = new PrestamoMongo.prestamos({id: prestamo.id, libro_id: prestamo.libro, 
            id_cliente: prestamo.cliente,created_at: prestamo.createdAt, Fecha_Entrega: prestamo.Fecha_Entrega, 
            Entregado: prestamo.Entregado})

            await pre.save().then(() => console.log('creado'))

            await mongoose.connection.close()

            console.log('CERRÉ SESIÓN CON ÉXITO')

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

            await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')

            await PrestamoMongo.prestamos.updateOne({"id": params.id}, {$set:{"Entregado": 'SÍ'}})

            console.log('CAMBIO REALIZADO')

            await mongoose.connection.close()

            console.log('CERRÉ SESIÓN CON ÉXITO')

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

            await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')

            await PrestamoMongo.prestamos.deleteOne({"id": params.id})

            console.log('PRESTAMO ELIMINADO')

            await mongoose.connection.close()

            console.log('CERRÉ SESIÓN CON ÉXITO')

            return prestamo
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL PRESTAMO')
        }
    }

    public async stock({params, response, auth}){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const prestamo = await Libro.findOrFail(params.id)

            await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')
            //AQUÍ HACE EL COUNT
            const pes2 = await PrestamoMongo.prestamos.aggregation(
                [{$match: {
                    libro_id: 1,
                    Entregado: 'NO'
                   }}, {$count: 'Entregado'}]
            )

            //const pes3 = pes2.find({'Entregado':"NO"})
            //const pes4 = pes3.find({$count:{}})

            console.log('BÚSQUEDA EN MONGO EXITOSA')

            await mongoose.connection.close()

            console.log('CERRÉ SESIÓN CON ÉXITO')

            return response.json({p:prestamo.stock, s:pes2})

        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

}
