/* import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Autor from 'App/Models/Autor';

export default class AutorsController {
    public async index({response}:HttpContextContract){
        try{
            const autor = await Autor.query()
            return autor
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bautor({params, response}:HttpContextContract){
        try{
            const autor = await Autor.query().where('id', params.id)
            return autor
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
            const autor = await Autor.create({nombre});
            return autor
        }
        catch{
            response.badRequest('ERROR AL GUARDAR EL AUTOR')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({request, params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const autor = await Autor.findOrFail(params.id)
            autor.nombre = request.input('nombre');
            await autor.save();
            return autor
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR EL AUTOR')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const autor = await Autor.findOrFail(params.id);
            await autor.delete();
            return autor
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL AUTOR')
        }
    }
} */