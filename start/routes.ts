/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

//VER ROLES
Route.get('rol/show', 'RolsController.index')
Route.get('Brol/:id', 'RolsController.Brol') //BUSCAR ROL POR ID

//REGISTRO Y LOGIN DE USUARIO
Route.post('usuario/crear', 'UsuariosController.store')
Route.post('usuario/login', 'UsuariosController.login')
Route.get('usuario/show', 'UsuariosController.index')
Route.get('Busuario/:id', 'UsuariosController.Buser') //VER USUARIO POR ID

//VER AUTOR
Route.get('autor/show', 'AutorsController.index');
Route.get('Bautor/:id', 'AutorsController.Bautor'); //BUSCAR AUTOR POR ID

//VER CATEGORIA
Route.get('categoria/show', 'CategoriasController.index');
Route.get('Bcategoria/:id', 'CategoriasController.Bcat'); //BUSCAR CATEGORIA POR ID

//VER EDITORIAL
Route.get('editorial/show','EditorialsController.index')
Route.get('Beditorial/:id','EditorialsController.Bedit') //BUSCAR EDITORIAL POR ID

//VER GENEROS
Route.get('genero/show','GenerosController.index')
Route.get('Bgenero/:id','GenerosController.Bgen') //BUSCAR GENERO POR ID

//VER ESTANTES
Route.get('estantes/show','EstantesController.index')
Route.get('Bestantes/:id','EstantesController.Best') //BUSCAR ESTANTE POR ID

//VER PASILLOS
Route.get('pasillo/show','PasillosController.index')
Route.get('Bpasillo/:id','PasillosController.Bpasillo') //BUSCAR PASILLO POR ID

//VER LAS UBICACIONES
Route.get('ubicacion/show', 'UbicacionsController.index')
Route.get('upbuscar/:id', 'UbicacionsController.Bpasillo') //BUSCAR POR PASILLO
Route.get('uebuscar/:id', 'UbicacionsController.Bestante') //BUSCAR POR ESTANTE
Route.get('Bubicacion/:id', 'UbicacionsController.Bubi') //BUSCAR UBICACION POR ID

//VER LIBROS
Route.get('libro/show', 'LibrosController.index')
Route.get('bidlibro/:id', 'LibrosController.Bid') //BUSCAR LIBRO POR ID
Route.post('bnombreLibro', 'LibrosController.Bnombre') //BUSCAR LIBRO POR NOMBRE +

//VER LIBROS GENERO
Route.get('lb/show', 'LibrogenerosController.index')
Route.get('lbGenero/:id', 'LibrogenerosController.LpBuscar') //BUSCAR LIBRO POR GENERO
Route.get('BlbGenero/:id', 'LibrogenerosController.Blg') //BUSCAR GENERO DE LIBRO POR ID

Route.get('session', 'UsuariosController.session') //VER SI HAY UNA SESSION

//TODOS LOS DE DENTRO DEL GROUP NECIESITAN TOKEN
Route.group(()=>{

  //RUTA AUTH ADMIN
  Route.get('admin', 'UsuariosController.IsAdmin')
  Route.get('admin2', 'UsuariosController.IsAdmin2')

  //RUTAS ROL
  Route.resource('rol', 'RolsController')

  //RUTAS USUARIO
  Route.resource('usuario','UsuariosController')
  Route.put('usuarioRol/:id', 'UsuariosController.updateRolToAdmin') //ACTUALIZAR ROL DE USUARIO A ADMIN
  Route.put('usuarioRolUser/:id', 'UsuariosController.updateRolToUser') //ACTUALIZAR ROL A USUARIO
  Route.post('logout', 'UsuariosController.logout') //CERRAR SESIÓN

  //RUTAS AUTOR
  Route.resource('autor','AutorsController')

  //RUTAS CATEGORIA
  Route.resource('categoria', 'CategoriasController')

  //RUTAS EDITORIAL
  Route.resource('editorial','EditorialsController')

  //RUTAS GENERO
  Route.resource('genero','GenerosController')

  //RUTAS ESTANTE
  Route.resource('estante','EstantesController')

  //RUTAS PASILLO
  Route.resource('pasillo','PasillosController')

  //RUTAS UBICACION
  Route.resource('ubicacion', 'UbicacionsController')

  //RUTAS LIBRO
  Route.resource('libro', 'LibrosController')

  //RUTAS LIBRO GENERO
  Route.resource('libroGenero', 'LibrogenerosController')

  //RUTAS PRESTAMO
  Route.resource('prestamo', 'PrestamosController') //LOS PRESTAMOS SOLO SE PUEDEN VER POR TOKEN
  Route.get('prestamoid/:id', 'PrestamosController.Busprest') //BUSCAR PRESTAMO POR ID DE PRESTAMO +
  Route.get('prestamoUser/:id', 'PrestamosController.Usprest') //VER PRESTAMOS DE UN USUARIO +
  Route.get('libroStock/:id', 'PrestamosController.stock')
  
}).prefix('api').middleware('auth');