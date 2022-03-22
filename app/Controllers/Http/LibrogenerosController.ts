import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Librogenero from 'App/Models/Librogenero';

export default class LibrogenerosController {
    public async index({}:HttpContextContract){
        //const lb = await Librogenero.query()//.innerJoin('libro', 'libro.id', 'librogenero.libro')
        //.innerJoin('genero', 'genero.id', 'librogenero.genero')
        //.select('libro.titulo', 'genero.nombre')

        const lb = await Database.query().from('librogenero').innerJoin('libro', 'libro.id', 'librogenero.libro')
        .innerJoin('genero', 'genero.id', 'librogenero.genero')
        .select('libro.id','libro.titulo', 'genero.nombre', 'libro.created_at', 'libro.updated_at')

        return lb//response.json({lb})
    }

    public async Blg({params}:HttpContextContract){
        //const lb = await Librogenero.query().where('id', params.id)

        const lb = await Database.query().from('librogenero').innerJoin('libro', 'libro.id', 'librogenero.libro')
        .innerJoin('genero', 'genero.id', 'librogenero.genero')
        .select('libro.id','libro.titulo', 'genero.nombre', 'libro.created_at', 'libro.updated_at')
        .where('libro.id', params.id)

        return lb//response.json({lb})
    }

    public async LpBuscar({params}:HttpContextContract){
        //const lb = await Librogenero.query().where('genero', params.id)

        const lb = await Database.query().from('librogenero').innerJoin('libro', 'libro.id', 'librogenero.libro')
        .innerJoin('genero', 'genero.id', 'librogenero.genero')
        .select('libro.id','libro.titulo', 'genero.nombre', 'libro.created_at', 'libro.updated_at')
        .where('librogenero.genero', params.id)

        return lb
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const libro = request.input('libro');
        const genero = request.input('genero');
        const lb = await Librogenero.create({libro, genero});
        return lb
    }

    //ACTUALIZAR AUTOR
    public async update({request, params}:HttpContextContract){
        const lb = await Librogenero.findOrFail(params.id)
        lb.libro = request.input('libro');
        lb.genero = request.input('genero');
        await lb.save();
        return lb
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const lb = await Librogenero.findOrFail(params.id);
        await lb.delete();
        return lb
    }
}
