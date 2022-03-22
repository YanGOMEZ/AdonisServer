import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Editorial from 'App/Models/Editorial';

export default class EditorialsController {
    public async index({}:HttpContextContract){
        const editorial = await Editorial.query()
        return editorial
    }

    public async Bedit({params}:HttpContextContract){
        const editorial = await Editorial.query().where('id', params.id)
        return editorial
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const nombre = request.input('nombre');
        const editorial = await Editorial.create({nombre});
        return editorial
    }

    //ACTUALIZAR AUTOR
    public async update({request, params}:HttpContextContract){
        const editorial = await Editorial.findOrFail(params.id)
        editorial.nombre = request.input('nombre');
        await editorial.save();
        return editorial
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const editorial = await Editorial.findOrFail(params.id);
        await editorial.delete();
        return editorial
    }
}
