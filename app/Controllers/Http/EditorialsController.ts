/* import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Editorial from 'App/Models/Editorial';

export default class EditorialsController {
    public async index({response}:HttpContextContract){
        try{
            const editorial = await Editorial.query()
            return editorial
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bedit({params, response}:HttpContextContract){
        try{
            const editorial = await Editorial.query().where('id', params.id)
            return editorial
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
            const nombre = request.input('nombre');
            const editorial = await Editorial.create({nombre});
            return editorial
        }
        catch{
            response.badRequest('ERROR AL GUARDAR EDITORIAL')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({request, params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const editorial = await Editorial.findOrFail(params.id)
            editorial.nombre = request.input('nombre');
            await editorial.save();
            return editorial
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR EDITORIAL')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const editorial = await Editorial.findOrFail(params.id);
            await editorial.delete();
            return editorial
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR LA EDITORIAL')
        }
    }
}
 */