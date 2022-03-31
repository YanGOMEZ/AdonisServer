import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Barco from "App/Models/Barco"
import Detalle from 'App/Models/Detalle'
import Mongobar from 'App/Models/mongoPrestamo'
import mongoose from 'mongoose'

export default class BarcosController {
    public async index({response}:HttpContextContract){
        try{
            const bar = await Barco.query()
            return bar
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async Bbarco({params, response}:HttpContextContract){
        try{
            const bar = await Barco.query().where('id', params.id)
            return bar
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    //CREAR NUEVO AUTOR
    public async storej1({request, response, auth}:HttpContextContract){
        try{
            var myArray = [1, 2, 3, 4, 5, 6, 7, 8];
            var i,j,k;
            for (i = myArray.length; i; i--) {
                j = Math.floor(Math.random() * i);
                k = myArray[i - 1];
                myArray[i - 1] = myArray[j];
                myArray[j] = k;
            }

            var myArray2 = [1, 2, 3, 4, 5, 6, 7, 8];
            var a,x,z;
            for (a = myArray2.length; a; a--) {
                x = Math.floor(Math.random() * a);
                z = myArray2[a - 1];
                myArray2[a - 1] = myArray2[x];
                myArray2[x] = z;
            }

            var myArray3 = [1, 2, 3, 4, 5, 6, 7, 8];
            var g,f,u;
            for (g = myArray3.length; g; g--) {
                f = Math.floor(Math.random() * g);
                u = myArray3[g - 1];
                myArray3[g - 1] = myArray3[f];
                myArray3[f] = u;
            }

            var myArray4 = [1, 2, 3, 4, 5, 6, 7, 8];
            var q,w,r;
            for (q = myArray4.length; q; q--) {
                w = Math.floor(Math.random() * q);
                r = myArray4[q - 1];
                myArray4[q - 1] = myArray4[w];
                myArray4[w] = r;
            }
            var regla = 0
            for (let index = 0; index < 15; index++) {
                await auth.use('api').authenticate()
                console.log(auth.use('api').user!)
                const partida = request.input('partida')
                const jugador = request.input('jugador')
                const barco = index + 1
                //var ale = Math.random() * (8-1) + 1
                var numero
                var po2
                if(regla == 8){
                    regla = 0
                }
                if(index >= 0 && index < 4){
                    numero = myArray[regla]
                    po2 ='A'
                }
                else if(index >= 4 && index <8){
                    numero = myArray2[regla]
                    po2 = 'B'
                }
                else if(index >= 8 && index <12){
                    numero = myArray3[regla]
                    po2 = 'C'
                }
                else if(index >= 12){
                    numero = myArray4[regla]
                    po2 = 'D'
                }
                regla = regla + 1
                const posicion = numero.toString() + po2
                const derribado = 'NO'
                const barc = await Barco.create({partida, jugador, barco, posicion, derribado});

                const con3 = await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

                console.log('CONEXIÓN CON EXITO')
    
                const pre = new Mongobar.prestamos({id: barc.id, partida: barc.partida, 
                jugador: barc.jugador, barco: barc.barco, posicion: barc.posicion, derribado: barc.derribado})
    
                await pre.save().then(() => console.log('creado'))
    
                //await mongoose.connection.close()
                con3.connection.close()
    
                console.log('CERRÉ SESIÓN CON ÉXITO')

            }
        }
        catch{
            response.badRequest('ERROR AL GUARDAR BARCOS')
        }
    }

    public async storej2({request, response, auth}:HttpContextContract){
        try{
            var myArray = [1, 2, 3, 4, 5, 6, 7, 8];
            var i,j,k;
            for (i = myArray.length; i; i--) {
                j = Math.floor(Math.random() * i);
                k = myArray[i - 1];
                myArray[i - 1] = myArray[j];
                myArray[j] = k;
            }

            var myArray2 = [1, 2, 3, 4, 5, 6, 7, 8];
            var a,x,z;
            for (a = myArray2.length; a; a--) {
                x = Math.floor(Math.random() * a);
                z = myArray2[a - 1];
                myArray2[a - 1] = myArray2[x];
                myArray2[x] = z;
            }

            var myArray3 = [1, 2, 3, 4, 5, 6, 7, 8];
            var g,f,u;
            for (g = myArray3.length; g; g--) {
                f = Math.floor(Math.random() * g);
                u = myArray3[g - 1];
                myArray3[g - 1] = myArray3[f];
                myArray3[f] = u;
            }

            var myArray4 = [1, 2, 3, 4, 5, 6, 7, 8];
            var q,w,r;
            for (q = myArray4.length; q; q--) {
                w = Math.floor(Math.random() * q);
                r = myArray4[q - 1];
                myArray4[q - 1] = myArray4[w];
                myArray4[w] = r;
            }
            var regla = 0
            for (let index = 0; index < 15; index++) {
                await auth.use('api').authenticate()
                console.log(auth.use('api').user!)
                const partida = request.input('partida')
                const jugador = request.input('jugador')
                const barco = index + 1
                //var ale = Math.random() * (8-1) + 1
                var numero
                var po2
                if(regla == 8){
                    regla = 0
                }
                if(index >= 0 && index < 4){
                    numero = myArray[regla]
                    po2 ='E'
                }
                else if(index >= 4 && index <8){
                    numero = myArray2[regla]
                    po2 = 'F'
                }
                else if(index >= 8 && index <12){
                    numero = myArray3[regla]
                    po2 = 'G'
                }
                else if(index >= 12){
                    numero = myArray4[regla]
                    po2 = 'H'
                }
                regla = regla + 1
                const posicion = numero.toString() + po2
                const derribado = 'NO'
                const barc = await Barco.create({partida, jugador, barco, posicion, derribado});

                const con3 = await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

                console.log('CONEXIÓN CON EXITO')
    
                const pre = new Mongobar.prestamos({id: barc.id, partida: barc.partida, 
                jugador: barc.jugador, barco: barc.barco, posicion: barc.posicion, derribado: barc.derribado})
    
                await pre.save().then(() => console.log('creado'))
    
                //await mongoose.connection.close()
                con3.connection.close()
    
                console.log('CERRÉ SESIÓN CON ÉXITO')
            }
        }
        catch{
            response.badRequest('ERROR AL GUARDAR BARCOS')
        }
    }

    //ACTUALIZAR AUTOR
    public async update({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const bar = await Barco.findOrFail(params.id)
            bar.derribado = 'SÍ'
            await bar.save();

            const con2 = await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')

            await Mongobar.prestamos.updateOne({"id": params.id}, {$set:{"derribado": 'SÍ'}})

            console.log('CAMBIO REALIZADO')

            //await mongoose.connection.close()
            con2.connection.close()

            console.log('CERRÉ SESIÓN CON ÉXITO')

            return bar
        }
        catch{
            response.badRequest('ERROR AL ACTUALIZAR BARCO')
        }
    }

    //ELIMINAR AUTOR
    public async destroy({params, response, auth}:HttpContextContract){
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            const bar = await Barco.findOrFail(params.id);
            await bar.delete();

            const con1 = await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')

            await Mongobar.prestamos.deleteOne({"id": params.id})

            console.log('BARCO ELIMINADO')

            //await mongoose.connection.close()
            con1.connection.close()

            console.log('CERRÉ SESIÓN CON ÉXITO')

            return bar
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL ROL')
        }
    }

    public async verGanador({response, params, request}){
        try{
            //await auth.use('api').authenticate()
            //console.log(auth.use('api').user!)
            const juga1 = request.input('jugador1')
            const juga2 = request.input('jugador2')
            const cone = await mongoose.connect('mongodb+srv://YAN:P4nDAJH@utt20170016.kcjvg.mongodb.net/booksite?retryWrites=true&w=majority')

            console.log('CONEXIÓN CON EXITO')
            //AQUÍ HACE EL COUNT
            const j1 = await Mongobar.prestamos.find({"partida":params.id,"derribado":"SÍ", "jugador":juga1})
            const j2 = await Mongobar.prestamos.find({"partida":params.id,"derribado":"SÍ", "jugador":juga2})

            var valor: number
            var valor2: number

            valor2 = 0
            valor = 0
            
            j1.forEach(element => {
                valor = valor+1
            });

            j2.forEach(element => {
                valor2 = valor2+1
            });

            console.log('BÚSQUEDA EN MONGO EXITOSA')

            //await mongoose.connection.close()
            //cone.connection.close()

            console.log('CERRÉ SESIÓN CON ÉXITO')
            if(valor <15 && valor2 <15){
                return response.status(200).json({"partida": true})
            }
            if(valor == 15){
                return response.status(200).json({"partida":false,"perdedor": "jugador 1"})
            }
            if(valor2 == 15){
                return response.status(200).json({"partida":false,"perdedor": "jugador 2"})
            }
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

}
