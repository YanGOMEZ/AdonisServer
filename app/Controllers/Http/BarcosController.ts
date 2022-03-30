import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Barco from "App/Models/Barco"

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

    public async Brol({params, response}:HttpContextContract){
        try{
            const bar = await Barco.query().where('id', params.id)
            return bar
        }
        catch{
            response.badRequest('ERROR AL MOSTRAR')
        }
    }

    public async numerosAleatoriosNoRepetidos(min, max, cantidad) {
        let numeros=[0,0,0,0,0,0,0,0];
     
        if (min>max || cantidad>max-min) {
            return false;
        }
     
        while (numeros.length<cantidad) {
            const num=Math.floor((Math.random() * (max - min)) + min );
            if (numeros.indexOf(num)==-1) {
                numeros.push(num);
            }
        }
        return numeros;
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
            for (let index = 0; index < 15; index++) {
                await auth.use('api').authenticate()
                console.log(auth.use('api').user!)
                const partida = request.input('partida')
                const jugador = request.input('jugador')
                const barco = index + 1
                //var ale = Math.random() * (8-1) + 1
                var numero
                var po2
                if(index >= 0 && index < 4){
                    numero = myArray[index]
                    po2 ='A'
                }
                else if(index >= 4 && index <8){
                    numero = 10
                    po2 = 'B'
                }
                else if(index >= 8 && index <12){
                    numero = 10
                    po2 = 'C'
                }
                else if(index >= 12){
                    numero = 10
                    po2 = 'D'
                }
                const posicion = numero.toString() + po2
                const derribado = 'NO'
                await Barco.create({partida, jugador, barco, posicion, derribado});
            }
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
            const bar = await Barco.findOrFail(params.id)
            bar.derribado = 'SÍ'
            await bar.save();
            return bar
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
            const bar = await Barco.findOrFail(params.id);
            await bar.delete();
            return bar
        }
        catch{
            response.badRequest('ERROR AL ELIMINAR EL ROL')
        }
    }
}
