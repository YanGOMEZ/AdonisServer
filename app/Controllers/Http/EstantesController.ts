/* import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Estante from "App/Models/Estante";

export default class EstantesController {
    public async index({response}:HttpContextContract){
        try{
            const est = await Estante.query()
            return est
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Best({params, response}:HttpContextContract){
        try{
            const est = await Estante.query().where('id', params.id)
            return est
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    //CREAR NUEVO AUTOR
    public async store({request, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const estante = request.input('estante');
            const est = await Estante.create({estante});
            return est
        }
        catch{
            response.badRequest('ERROR AL GUARDAR EL ESTANTE')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({request, params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const est = await Estante.findOrFail(params.id)
            est.estante = request.input('estante');
            await est.save();
            return est
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR EL ESTANTE')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const est = await Estante.findOrFail(params.id);
            await est.delete();
            return est
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL ESTANTE')
        }
    }
}
 */