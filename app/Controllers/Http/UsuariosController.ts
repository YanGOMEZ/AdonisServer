import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import usuario from "App/Models/usuario";
import Database from '@ioc:Adonis/Lucid/Database';
import mongoose from 'mongoose'
import PrestamoMongo from 'App/Models/mongoPrestamo'

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
    public async store({request, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
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
    public async update({request, params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
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
    public async updateRolToAdmin({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const user = await usuario.findOrFail(params.id)
            if(user.rol == 1){
                user.rol = 2
            }
            else if(user.rol == 2){
                user.rol = 1
            }
            await user.save();
            return user
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR AL USUARIO A ADMIN')
        }
    }

    //ELIMINAR USUARIO
    public async destroy({params, response, auth}:HttpContextContract){
        try{

            await Database.query().delete().from('prestamos').where('cliente', params.id)

            await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')

            await PrestamoMongo.prestamos.deleteMany({"id_cliente": params.id})

            console.log('PRESTAMO ELIMINADO')

            await mongoose.connection.close()

            console.log('CERRÉ SESIÓN CON ÉXITO')

            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
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
                return true
            }
            else
            {
                return false
            }
        }
        catch{
            return response.badRequest('Usuario inexistente')
        }
    }

    public async IsAdmin2({response, auth}){
        try{
            const user =  await auth.use('api').authenticate()
            if(user.rol == 1)
            {
                return user.id
            }
            else
            {
                return user.id
            }
        }
        catch{
            return response.badRequest('Usuario inexistente')
        }
    }

    public async session({response, auth}){
        try{
            const user = await auth.use('api').authenticate()
            if(user == null){
                return false
            }
            else{
                return true
            }
        }
        catch{
            return response.badRequest('ERROR DE COMPROBACIÓN')
        }
    }

}