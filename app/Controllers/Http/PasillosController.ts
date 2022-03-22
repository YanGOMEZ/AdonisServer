import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pasillo from 'App/Models/Pasillo';

export default class PasillosController {
    public async index({}:HttpContextContract){
        const pas = await Pasillo.query()
        return pas
    }

    public async Bpasillo({params}:HttpContextContract){
        const pas = await Pasillo.query().where('id', params.id)
        return pas
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const pasillo = request.input('pasillo');
        const pas = await Pasillo.create({pasillo});
        return pas
    }

    //ACTUALIZAR AUTOR
    public async update({request, params}:HttpContextContract){
        const pas = await Pasillo.findOrFail(params.id)
        pas.pasillo = request.input('pasillo');
        await pas.save();
        return pas
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const pas = await Pasillo.findOrFail(params.id);
        await pas.delete();
        return pas
    }
}
