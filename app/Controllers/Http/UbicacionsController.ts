import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ubicacion from 'App/Models/Ubicacion';

export default class UbicacionsController {
    public async index({response}:HttpContextContract){
        try{
            const ubicacion = await Ubicacion.query().innerJoin('pasillo', 'pasillo.id', 'ubicacion.pasillo')
            .innerJoin('estante','estante.id','ubicacion.estante').select('ubicacion.id',
            'pasillo.pasillo', 'estante.estante', 'ubicacion.created_at', 'ubicacion.updated_at')
            return ubicacion
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bubi({params, response}:HttpContextContract){
        try{
            const ubicacion = await Ubicacion.query().innerJoin('pasillo', 'pasillo.id', 'ubicacion.pasillo')
            .innerJoin('estante','estante.id','ubicacion.estante').select('ubicacion.id',
            'pasillo.pasillo', 'estante.estante', 'ubicacion.created_at', 'ubicacion.updated_at')
            .where('ubicacion.id', params.id)
            return ubicacion
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bpasillo({params, response}:HttpContextContract){
        try{
            const ubicacion = await Ubicacion.query().innerJoin('pasillo', 'pasillo.id', 'ubicacion.pasillo')
            .innerJoin('estante','estante.id','ubicacion.estante').where('ubicacion.pasillo', params.id).select('ubicacion.id',
            'pasillo.pasillo', 'estante.estante', 'ubicacion.created_at', 'ubicacion.updated_at')
            return ubicacion
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bestante({params, response}:HttpContextContract){
        try{
            const ubicacion = await Ubicacion.query().innerJoin('pasillo', 'pasillo.id', 'ubicacion.pasillo')
            .innerJoin('estante','estante.id','ubicacion.estante').where('ubicacion.estante', params.id).select('ubicacion.id',
            'pasillo.pasillo', 'estante.estante', 'ubicacion.created_at', 'ubicacion.updated_at')
            return ubicacion
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    //CREAR NUEVO AUTOR
    public async store({request, response}:HttpContextContract){
        try{
            const pasillo = request.input('pasillo');
            const estante = request.input('estante');
            const ubicacion = await Ubicacion.create({pasillo, estante})
            return ubicacion
        }
        catch{
            response.badRequest('ERROR AL GUARDAR UBICACION')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({request, params, response}:HttpContextContract){
        try{
            const ubicacion = await Ubicacion.findOrFail(params.id)
            ubicacion.pasillo = request.input('pasillo')
            ubicacion.estante = request.input('estante')
            await ubicacion.save();
            return ubicacion
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR UBICACION')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response}:HttpContextContract){
        try{
            const ubicacion = await Ubicacion.findOrFail(params.id);
            await ubicacion.delete();
            return ubicacion
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR UBICACION')
        }
    }
}
