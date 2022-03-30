/* import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Librogenero from 'App/Models/Librogenero';

export default class LibrogenerosController {
    public async index({response}:HttpContextContract){
        //const lb = await Librogenero.query()//.innerJoin('libro', 'libro.id', 'librogenero.libro')
        //.innerJoin('genero', 'genero.id', 'librogenero.genero')
        //.select('libro.titulo', 'genero.nombre')

        try{
            const lb = await Database.query().from('librogenero').innerJoin('libro', 'libro.id', 'librogenero.libro')
            .innerJoin('genero', 'genero.id', 'librogenero.genero')
            .select('libro.id','libro.titulo', 'genero.nombre', 'libro.created_at', 'libro.updated_at')
    
            return lb//response.json({lb})
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }

    }

    public async Blg({params, response}:HttpContextContract){
        //const lb = await Librogenero.query().where('id', params.id)

        try{
            const lb = await Database.query().from('librogenero').innerJoin('libro', 'libro.id', 'librogenero.libro')
            .innerJoin('genero', 'genero.id', 'librogenero.genero')
            .select('libro.id','libro.titulo', 'genero.nombre', 'libro.created_at', 'libro.updated_at')
            .where('libro.id', params.id)
    
            return lb//response.json({lb})
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }

    }

    public async LpBuscar({params, response}:HttpContextContract){
        //const lb = await Librogenero.query().where('genero', params.id)
        try{
            const lb = await Database.query().from('librogenero').innerJoin('libro', 'libro.id', 'librogenero.libro')
            .innerJoin('genero', 'genero.id', 'librogenero.genero')
            .select('libro.id','libro.titulo', 'genero.nombre', 'libro.created_at', 'libro.updated_at')
            .where('librogenero.genero', params.id)
    
            return lb
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
            const genero = request.input('genero');
            const lb = await Librogenero.create({libro, genero});
            return lb
        }
        catch{
            response.badRequest('ERROR AL GUARDAR EL GENERO DEL LIBRO')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({request, params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const lb = await Librogenero.findOrFail(params.id)
            lb.libro = request.input('libro');
            lb.genero = request.input('genero');
            await lb.save();
            return lb
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR EL GENERO DEL LIBRO')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const lb = await Librogenero.findOrFail(params.id);
            await lb.delete();
            return lb
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL GENERO DEL LIBRO')
        }
    }
}
 */