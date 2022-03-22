import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ubicacion from 'App/Models/Ubicacion';

export default class UbicacionsController {
    public async index({}:HttpContextContract){
        const ubicacion = await Ubicacion.query().innerJoin('pasillo', 'pasillo.id', 'ubicacion.pasillo')
        .innerJoin('estante','estante.id','ubicacion.estante').select('ubicacion.id',
        'pasillo.pasillo', 'estante.estante', 'ubicacion.created_at', 'ubicacion.updated_at')
        return ubicacion
    }

    public async Bubi({params}:HttpContextContract){
        const ubicacion = await Ubicacion.query().innerJoin('pasillo', 'pasillo.id', 'ubicacion.pasillo')
        .innerJoin('estante','estante.id','ubicacion.estante').select('ubicacion.id',
        'pasillo.pasillo', 'estante.estante', 'ubicacion.created_at', 'ubicacion.updated_at')
        .where('ubicacion.id', params.id)
        return ubicacion
    }

    public async Bpasillo({params}:HttpContextContract){
        const ubicacion = await Ubicacion.query().innerJoin('pasillo', 'pasillo.id', 'ubicacion.pasillo')
        .innerJoin('estante','estante.id','ubicacion.estante').where('ubicacion.pasillo', params.id).select('ubicacion.id',
        'pasillo.pasillo', 'estante.estante', 'ubicacion.created_at', 'ubicacion.updated_at')
        return ubicacion
    }

    public async Bestante({params}:HttpContextContract){
        const ubicacion = await Ubicacion.query().innerJoin('pasillo', 'pasillo.id', 'ubicacion.pasillo')
        .innerJoin('estante','estante.id','ubicacion.estante').where('ubicacion.estante', params.id).select('ubicacion.id',
        'pasillo.pasillo', 'estante.estante', 'ubicacion.created_at', 'ubicacion.updated_at')
        return ubicacion
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const pasillo = request.input('pasillo');
        const estante = request.input('estante');
        const ubicacion = await Ubicacion.create({pasillo, estante})
        return ubicacion
    }

    //ACTUALIZAR AUTOR
    public async update({request, params}:HttpContextContract){
        const ubicacion = await Ubicacion.findOrFail(params.id)
        ubicacion.pasillo = request.input('pasillo')
        ubicacion.estante = request.input('estante')
        await ubicacion.save();
        return ubicacion
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const ubicacion = await Ubicacion.findOrFail(params.id);
        await ubicacion.delete();
        return ubicacion
    }
}
