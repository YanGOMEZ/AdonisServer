import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Detalle from 'App/Models/Detalle'

export default class DetallesController {
    public async index({response}:HttpContextContract){
        try{
            const rol = await Database.query().from('detalles')
            .innerJoin('usuarios', 'detalles.ganador', 'usuarios.id')
            .select('detalles.id', 'detalles.partida' ,'usuarios.nombre as ganador')
            return rol
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bganador({params, response}:HttpContextContract){
        try{
            const rol = await Database.query().from('detalles')
            .innerJoin('usuarios', 'detalles.ganador', 'usuarios.id')
            .select('detalles.id', 'detalles.partida' , 'usuarios.nombre as ganador').where('usuarios.id', params.id)
            return rol
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
            const partida = request.input('partida');
            const ganador = request.input('ganador');
            const rolc = await Database.rawQuery('insert into detalles (partida, ganador) values('+ partida +',' + ganador+')')
            return rolc
        }
        catch{
            response.badRequest('ERROR AL GUARDAR EL DETALLE DEL GANADOR')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const rol = await Detalle.findOrFail(params.id);
            await rol.delete();
            return rol
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL DETALLE')
        }
    }
}
