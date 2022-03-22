import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria';

export default class CategoriasController {
    public async index({}:HttpContextContract){
        const categoria = await Categoria.query()
        return categoria
    }

    public async Bcat({params}:HttpContextContract){
        const categoria = await Categoria.query().where('id', params.id)
        return categoria
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const nombre = request.input('nombre');
        const categoria = await Categoria.create({nombre});
        return categoria
    }

    //ACTUALIZAR AUTOR
    public async update({request, params}:HttpContextContract){
        const categoria = await Categoria.findOrFail(params.id)
        categoria.nombre = request.input('nombre');
        await categoria.save();
        return categoria
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const categoria = await Categoria.findOrFail(params.id);
        await categoria.delete();
        return categoria
    }
}
