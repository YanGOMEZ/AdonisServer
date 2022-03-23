import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rol from 'App/Models/Rol';

export default class RolsController {
    public async index({response}:HttpContextContract){
        try{
            const rol = await Rol.query()
            return rol
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Brol({params, response}:HttpContextContract){
        try{
            const rol = await Rol.query().where('id', params.id)
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
            const rol = request.input('rol');
            const rolc = await Rol.create({rol});
            return rolc
        }
        catch{
            response.badRequest('ERROR AL GUARDAR ROL')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({request, params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const rol = await Rol.findOrFail(params.id)
            rol.rol = request.input('rol');
            await rol.save();
            return rol
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR ROL')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const rol = await Rol.findOrFail(params.id);
            await rol.delete();
            return rol
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL ROL')
        }
    }
}
