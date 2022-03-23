import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Genero from 'App/Models/Genero';

export default class GenerosController {
    public async index({response}:HttpContextContract){
        try{
            const genero = await Genero.query()
            return genero
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bgen({params, response}:HttpContextContract){
        try{
            const genero = await Genero.query().where('id', params.id)
            return genero
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
            const genero = await Genero.create({nombre});
            return genero
        }
        catch{
            response.badRequest('ERROR AL GUARDAR EL NUEVO GENERO')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({request, params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const genero = await Genero.findOrFail(params.id)
            genero.nombre = request.input('nombre');
            await genero.save();
            return genero
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR EL GENERO')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const genero = await Genero.findOrFail(params.id);
            await genero.delete();
            return genero
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL GENERO')
        }
    }
}
