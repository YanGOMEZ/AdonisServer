import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Prestamo from 'App/Models/Prestamo';

export default class PrestamosController {
    public async index({}:HttpContextContract){
        const prestamo = await Database.query().from('prestamos')
        .innerJoin('libro', 'prestamos.libro', 'libro.id')
        .innerJoin('usuarios', 'prestamos.cliente', 'usuarios.id')
        .select('prestamos.id','prestamos.libro as libro_id','libro.titulo'
        ,'prestamos.cliente as id_cliente', 'usuarios.nombre as cliente','prestamos.created_at', 
        'prestamos.updated_at','prestamos.Fecha_Entrega',
        'prestamos.Entregado')
        return prestamo
    }

    public async Busprest({params}:HttpContextContract){
        const prestamo = await Database.query().from('prestamos')
        .innerJoin('libro', 'prestamos.libro', 'libro.id')
        .innerJoin('usuarios', 'prestamos.cliente', 'usuarios.id')
        .select('prestamos.id','prestamos.libro as libro_id','libro.titulo'
        ,'prestamos.cliente as id_cliente', 'usuarios.nombre as cliente','prestamos.created_at', 
        'prestamos.updated_at','prestamos.Fecha_Entrega',
        'prestamos.Entregado').where('prestamos.id', params.id)
        return prestamo
    }

    public async Usprest({params}:HttpContextContract){
        const prestamo = await Database.query().from('prestamos')
        .innerJoin('libro', 'prestamos.libro', 'libro.id')
        .innerJoin('usuarios', 'prestamos.cliente', 'usuarios.id')
        .select('prestamos.id','prestamos.libro as libro_id','libro.titulo'
        ,'prestamos.cliente as id_cliente', 'usuarios.nombre as cliente','prestamos.created_at', 
        'prestamos.updated_at','prestamos.Fecha_Entrega',
        'prestamos.Entregado').where('prestamos.cliente', params.id)
        return prestamo
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const libro = request.input('libro');
        const cliente = request.input('cliente');
        const Fecha_Entrega = request.input('fecha_entrega');
        const Entregado = 'NO'
        const prestamo = await Prestamo.create({libro, cliente, Fecha_Entrega, Entregado});
        return prestamo
    }

    //ACTUALIZAR AUTOR
    public async update({params}:HttpContextContract){
        const prestamo = await Prestamo.findOrFail(params.id)
        prestamo.Entregado = 'SÍ'
        await prestamo.save();
        return prestamo
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const prestamo = await Prestamo.findOrFail(params.id);
        await prestamo.delete();
        return prestamo
    }
}
