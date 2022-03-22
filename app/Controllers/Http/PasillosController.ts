import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pasillo from 'App/Models/Pasillo';

export default class PasillosController {
    public async index({response}:HttpContextContract){
        try{
            const pas = await Pasillo.query()
            return pas
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bpasillo({params, response}:HttpContextContract){
        try{
            const pas = await Pasillo.query().where('id', params.id)
            return pas
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    //CREAR NUEVO AUTOR
    public async store({request, response}:HttpContextContract){
        try{
            const pasillo = request.input('pasillo');
            const pas = await Pasillo.create({pasillo});
            return pas
        }
        catch{
            response.badRequest('ERROR AL GUARDAR PASILLO')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({request, params, response}:HttpContextContract){
        try{
            const pas = await Pasillo.findOrFail(params.id)
            pas.pasillo = request.input('pasillo');
            await pas.save();
            return pas
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR EL PASILLO')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response}:HttpContextContract){
        try{
            const pas = await Pasillo.findOrFail(params.id);
            await pas.delete();
            return pas
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL PASILLO')
        }
    }
}
