import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Estante from "App/Models/Estante";

export default class EstantesController {
    public async index({}:HttpContextContract){
        const est = await Estante.query()
        return est
    }

    public async Best({params}:HttpContextContract){
        const est = await Estante.query().where('id', params.id)
        return est
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const estante = request.input('estante');
        const est = await Estante.create({estante});
        return est
    }

    //ACTUALIZAR AUTOR
    public async update({request, params}:HttpContextContract){
        const est = await Estante.findOrFail(params.id)
        est.estante = request.input('estante');
        await est.save();
        return est
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const est = await Estante.findOrFail(params.id);
        await est.delete();
        return est
    }
}
