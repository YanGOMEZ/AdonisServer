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
            const fech = new Date(-0.7)
            const Fecha_Entrega = fech//'fecha_entrega'
            const Entregado = 'NO'
            const prestamo = await Prestamo.create({libro, cliente, Fecha_Entrega, Entregado});

            const con3 = await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')

            const pre = new PrestamoMongo.prestamos({id: prestamo.id, libro_id: prestamo.libro, 
            id_cliente: prestamo.cliente,created_at: prestamo.createdAt, Fecha_Entrega: prestamo.Fecha_Entrega, 
            Entregado: prestamo.Entregado})

            await pre.save().then(() => console.log('creado'))

            //await mongoose.connection.close()
            con3.connection.close()

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

            const con2 = await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')

            await PrestamoMongo.prestamos.updateOne({"id": params.id}, {$set:{"Entregado": 'SÍ'}})

            console.log('CAMBIO REALIZADO')

            //await mongoose.connection.close()
            con2.connection.close()

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

            const con1 = await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')

            await PrestamoMongo.prestamos.deleteOne({"id": params.id})

            console.log('PRESTAMO ELIMINADO')

            //await mongoose.connection.close()
            con1.connection.close()

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

            const cone = await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')
            //AQUÍ HACE EL COUNT
            const pes2 = await PrestamoMongo.prestamos.find({"libro_id":params.id, "Entregado":"NO"})

            var valor: number

            valor = 0
            
            pes2.forEach(element => {
                valor = valor+1
            });

            console.log('BÚSQUEDA EN MONGO EXITOSA')

            //await mongoose.connection.close()
            //cone.connection.close()

            console.log('CERRÉ SESIÓN CON ÉXITO')

            if(valor >= prestamo.stock){
                return response.status(200).json({"stock": false})
            }
            else{
                return response.status(200).json({"stock": true})
            }
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

}
