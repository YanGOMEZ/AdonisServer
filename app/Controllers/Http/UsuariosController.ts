import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import usuario from "App/Models/usuario";

export default class UsuariosController {
    //MOSTRAR USUARIOS
    public async index({response}:HttpContextContract){
        try{
            const user = await usuario.query()
            return user
        }
        catch{
            response.badRequest('ERROR AL BUSCAR TODOS LOS USUARIOS')
        }
    }

    public async Buser({params, response}:HttpContextContract){
        try{
            const user = await usuario.query().where('id', params.id)
            return user
        }
        catch{
            response.badRequest('ERROR AL BUSCAR')
        }
    }

    //SOY COMEN

    //CREAR NUEVO USUARIO
    public async store({request, response}:HttpContextContract){
        try{
            const email = request.input('email');
            const nombre = request.input('nombre');
            const password = request.input('password');
            const rol = request.input('rol')
            const user = await usuario.create({nombre, email, password, rol});
            return user
        }
        catch{
            response.badRequest('ERROR AL ALMACENAR')
        }
    }

    //ACTUALIZAR USUARIO
    public async update({request, params, response}:HttpContextContract){
        try{
            const user = await usuario.findOrFail(params.id)
            user.nombre = request.input('nombre');
            user.password = request.input('password');
            await user.save();
            return user
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR')
        }
    }

    //ACTUALIZAR USUARIO
    public async updateRolToAdmin({params, response}:HttpContextContract){
        try{
            const user = await usuario.findOrFail(params.id)
            user.rol = 1
            await user.save();
            return user
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR AL USUARIO A ADMIN')
        }
    }

    public async updateRolToUser({params, response}:HttpContextContract){
        try{
            const user = await usuario.findOrFail(params.id)
            user.rol = 2
            await user.save();
            return user
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR EL ROL DE USUARIO A USUARIO')
        }
    }

    //ELIMINAR USUARIO
    public async destroy({params, response}:HttpContextContract){
        try{
            const user = await usuario.findOrFail(params.id);
            await user.delete();
            return user
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR USUARIO')
        }
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