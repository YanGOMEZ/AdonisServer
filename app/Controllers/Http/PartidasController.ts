import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Partida from 'App/Models/Partida'

export default class PartidasController {
    public async index({response}:HttpContextContract){
        try{
            const par = await Partida.query()
            return par
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bpar({params, response}:HttpContextContract){
        try{
            const par = await Partida.query().where('id', params.id)
            return par
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
            const jugador1 = request.input('jugador1');
            const jugador2 = request.input('jugador2');
            const par = await Partida.create({jugador1, jugador2});
            return par
        }
        catch{
            response.badRequest('ERROR AL GUARDAR LA PARTIDA')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const par = await Partida.findOrFail(params.id);
            await par.delete();
            return par
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR LA PARTIDA')
        }
    }
}
