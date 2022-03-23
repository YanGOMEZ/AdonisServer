import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categoria from 'App/Models/Categoria';

export default class CategoriasController {
    public async index({response}:HttpContextContract){
        try{
            const categoria = await Categoria.query()
            return categoria
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bcat({params, response}:HttpContextContract){
        try{
            const categoria = await Categoria.query().where('id', params.id)
            return categoria
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
            const categoria = await Categoria.create({nombre});
            return categoria
        }
        catch{
            response.badRequest('ERROR AL GUARDAR LA CATEGORIA')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({request, params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const categoria = await Categoria.findOrFail(params.id)
            categoria.nombre = request.input('nombre');
            await categoria.save();
            return categoria
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR LA CATEGORIA')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const categoria = await Categoria.findOrFail(params.id);
            await categoria.delete();
            return categoria
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR LA CATEGORIA')
        }
    }
}
