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
            for (g = myArray2.length; g; g--) {
                f = Math.floor(Math.random() * g);
                u = myArray2[g - 1];
                myArray2[g - 1] = myArray2[f];
                myArray2[f] = u;
            }

            var myArray4 = [1, 2, 3, 4, 5, 6, 7, 8];
            var q,w,r;
            for (q = myArray2.length; q; q--) {
                w = Math.floor(Math.random() * q);
                r = myArray2[q - 1];
                myArray2[q - 1] = myArray2[w];
                myArray2[w] = r;
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
                var regla = 0
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
                regla++
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
