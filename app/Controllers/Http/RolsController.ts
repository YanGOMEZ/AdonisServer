import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rol from 'App/Models/Rol';

export default class RolsController {
    public async index({}:HttpContextContract){
        const rol = await Rol.query()
        return rol
    }

    public async Brol({params}:HttpContextContract){
        const rol = await Rol.query().where('id', params.id)
        return rol
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const rol = request.input('rol');
        const rolc = await Rol.create({rol});
        return rolc
    }

    //ACTUALIZAR AUTOR
    public async update({request, params}:HttpContextContract){
        const rol = await Rol.findOrFail(params.id)
        rol.rol = request.input('rol');
        await rol.save();
        return rol
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const rol = await Rol.findOrFail(params.id);
        await rol.delete();
        return rol
    }
}
