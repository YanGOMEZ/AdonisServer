import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Libro from 'App/Models/Libro'

export default class LibrosController {
    public async index({}:HttpContextContract){
        //const libro = await Libro.query()//.innerJoin('editorial', 'editorial.id', 'libro.editorial')
        //.innerJoin('categoria', 'categoria.id', 'libro.categoria')
        //.innerJoin('autor', 'autor.id', 'libro.autor')
        //.innerJoin('ubicacion', 'ubicacion.id', 'libro.ubicacion')
        //.select('libro.titulo','editorial.nombre')

        const libro = await Database.query().from('libro').innerJoin('editorial', 'editorial.id', 'libro.editorial')
        .innerJoin('categoria', 'categoria.id', 'libro.categoria')
        .innerJoin('autor', 'autor.id', 'libro.autor')
        .innerJoin('ubicacion', 'ubicacion.id', 'libro.ubicacion')
        .innerJoin('pasillo', 'ubicacion.pasillo', 'pasillo.id')
        .innerJoin('estante', 'ubicacion.estante', 'estante.id')
        .select('libro.id','libro.titulo','libro.sinopsis','libro.portada','libro.stock','editorial.nombre as editorial', 'categoria.nombre as categoria',
        'autor.nombre as autor', 'pasillo.pasillo', 'estante.estante')

        return libro
    }

    public async Bid({params}:HttpContextContract){
        //const libro = await Libro.query().where('libro.id', params.id)//.innerJoin('editorial', 'editorial.id', 'libro.editorial')
        //.innerJoin('categoria', 'categoria.id', 'libro.categoria')
        //.innerJoin('autor', 'autor.id', 'libro.autor')
        //.innerJoin('ubicacion', 'ubicacion.id', 'libro.ubicacion')
        //.select('libro.titulo','editorial.nombre')

        const libro = await Database.query().from('libro').innerJoin('editorial', 'editorial.id', 'libro.editorial')
        .innerJoin('categoria', 'categoria.id', 'libro.categoria')
        .innerJoin('autor', 'autor.id', 'libro.autor')
        .innerJoin('ubicacion', 'ubicacion.id', 'libro.ubicacion')
        .innerJoin('pasillo', 'ubicacion.pasillo', 'pasillo.id')
        .innerJoin('estante', 'ubicacion.estante', 'estante.id')
        .select('libro.id','libro.titulo','libro.sinopsis','libro.portada','libro.stock','editorial.nombre as editorial', 'categoria.nombre as categoria',
        'autor.nombre as autor', 'pasillo.pasillo', 'estante.estante').where('libro.id', params.id)

        return libro
    }

    public async Bnombre({request}:HttpContextContract){
        const nombre = request.input('titulo')

        const libro = await Database.query().from('libro').innerJoin('editorial', 'editorial.id', 'libro.editorial')
        .innerJoin('categoria', 'categoria.id', 'libro.categoria')
        .innerJoin('autor', 'autor.id', 'libro.autor')
        .innerJoin('ubicacion', 'ubicacion.id', 'libro.ubicacion')
        .innerJoin('pasillo', 'ubicacion.pasillo', 'pasillo.id')
        .innerJoin('estante', 'ubicacion.estante', 'estante.id')
        .select('libro.id','libro.titulo','libro.sinopsis','libro.portada','libro.stock','editorial.nombre as editorial', 'categoria.nombre as categoria',
        'autor.nombre as autor', 'pasillo.pasillo', 'estante.estante').where('libro.titulo', 'like', '%'+nombre+'%')

        return libro
    }

    //CREAR NUEVO AUTOR
    public async store({request}:HttpContextContract){
        const titulo = request.input('titulo');
        const sinopsis = request.input('sinopsis');
        const portada = request.input('portada');
        const stock = request.input('stock');
        const editorial = request.input('editorial');
        const categoria = request.input('categoria');
        const autor = request.input('autor');
        const ubicacion = request.input('ubicacion');
        const libro = await Libro.create({titulo, sinopsis, portada, stock, editorial
        , categoria, autor, ubicacion})
        return libro
    }

    //ACTUALIZAR AUTOR
    public async update({request, params}:HttpContextContract){
        const libro = await Libro.findOrFail(params.id)
        libro.titulo = request.input('titulo')
        libro.sinopsis = request.input('sinopsis')
        libro.portada = request.input('portada')
        libro.stock = request.input('stock')
        libro.editorial = request.input('editorial')
        libro.categoria = request.input('categoria')
        libro.autor = request.input('autor')
        libro.ubicacion = request.input('ubicacion')
        await libro.save();
        return libro
    }

    //ELIMINAR AUTOR
    public async destroy({params}:HttpContextContract){
        const libro = await Libro.findOrFail(params.id);
        await libro.delete();
        return libro
    }
}
