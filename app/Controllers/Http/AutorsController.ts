import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Autor from 'App/Models/Autor';

export default class AutorsController {
    public async index({}:HttpContextContract){
        const autor = await Autor.query()
        return autor
    }

    public async Bautor({params}:HttpContextContract){
        const autor = await Autor.query().where('id', params.id)
        return autor
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const nombre = request.input('nombre');
        const autor = await Autor.create({nombre});
        return autor
    }

    //ACTUALIZAR AUTOR
    public async update({request, params}:HttpContextContract){
        const autor = await Autor.findOrFail(params.id)
        autor.nombre = request.input('nombre');
        await autor.save();
        return autor
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const autor = await Autor.findOrFail(params.id);
        await autor.delete();
        return autor
    }
}