import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import usuario from "App/Models/usuario";

export default class UsuariosController {
    //MOSTRAR USUARIOS
    public async index({}:HttpContextContract){
        const user = await usuario.query()
        return user
    }

    public async Buser({params}:HttpContextContract){
        const user = await usuario.query().where('id', params.id)
        return user
    }

    //CREAR NUEVO USUARIO
    public async store({request}:HttpContextContract){
        const email = request.input('email');
        const nombre = request.input('nombre');
        const password = request.input('password');
        const rol = request.input('rol')
        const user = await usuario.create({nombre, email, password, rol});
        return user
    }

    //ACTUALIZAR USUARIO
    public async update({request, params}:HttpContextContract){
        const user = await usuario.findOrFail(params.id)
        user.nombre = request.input('nombre');
        user.password = request.input('password');
        await user.save();
        return user
    }

    //ACTUALIZAR USUARIO
    public async updateRolToAdmin({params}:HttpContextContract){
        const user = await usuario.findOrFail(params.id)
        user.rol = 1
        await user.save();
        return user
    }

    public async updateRolToUser({params}:HttpContextContract){
        const user = await usuario.findOrFail(params.id)
        user.rol = 2
        await user.save();
        return user
    }

    //ELIMINAR USUARIO
    public async destroy({params}:HttpContextContract){
        const user = await usuario.findOrFail(params.id);
        await user.delete();
        return user
    }

    //LOGIN USUARIO
    public async login({auth, request, response}){
        const email = request.input('email')
        const password = request.input('password')

        try{
            const token = await auth.use('api').attempt(email, password);
            return token;  
        }catch{
            return response.badRequest('Datos no válidos')
        }
    }

    public async logout({auth, response}){
        try{
            await auth.use('api').revoke()
            return {revoked: true}
        }
        catch{
            return response.badRequest('ERROR')
        }
    }

    public async IsAdmin({response, auth}){
        try{
            const user =  await auth.use('api').authenticate()
            if(user.rol == 1)
            {
                return { id: user.id, admin: true}
            }
            else
            {
                return { id: user.id, admin: false}
            }
        }
        catch{
            return response.badRequest('Usuario inexistente')
        }
    }

}