import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Genero from 'App/Models/Genero';

export default class GenerosController {
    public async index({}:HttpContextContract){
        const genero = await Genero.query()
        return genero
    }

    public async Bgen({params}:HttpContextContract){
        const genero = await Genero.query().where('id', params.id)
        return genero
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const nombre = request.input('nombre');
        const genero = await Genero.create({nombre});
        return genero
    }

    //ACTUALIZAR AUTOR
    public async update({request, params}:HttpContextContract){
        const genero = await Genero.findOrFail(params.id)
        genero.nombre = request.input('nombre');
        await genero.save();
        return genero
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const genero = await Genero.findOrFail(params.id);
        await genero.delete();
        return genero
    }
}
