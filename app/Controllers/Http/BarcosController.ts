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
            for (let index = 0; index < 15; index++) {
                var arreglo = [0,0,0,0,0,0,0,0]
                await auth.use('api').authenticate()
                console.log(auth.use('api').user!)
                const partida = request.input('partida')
                const jugador = request.input('jugador')
                const barco = index + 1
                var ale = Math.random() * (8-1) + 1
                var numero = Math.floor(ale)
                if(index == 0){
                    arreglo[0] = numero
                }else{
                    for (let index = 1; index < 15; index++) {
                        for (let indexc = index; indexc < 8; indexc++) {
                            if(arreglo[indexc] != numero){
                                arreglo[indexc] = numero
                            }
                            else{
                                var ale = Math.random() * (8-1) + 1
                                numero = Math.floor(ale)
                            }
                        }
                    }
                }
                var po2
                if(index >= 0 && index < 4){
                    po2 ='A'
                }
                else if(index >= 4 && index <8){
                    po2 = 'B'
                }
                else if(index >= 8 && index <12){
                    po2 = 'C'
                }
                else if(index >= 12){
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
