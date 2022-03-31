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

Route.put('prestamoAct/:id', 'PrestamosController.update') //ACTUALIZAR PRESTAMO, FUERA DE LA API

Route.put('rolAct/:id', 'UsuariosController.updateRolToAdmin') //ACTUALIZAR EL ROL DEL USUARIO, FUERA DE LA API

//VER ROLES
Route.get('rol/show', 'RolsController.index')
Route.get('Brol/:id', 'RolsController.Brol') //BUSCAR ROL POR ID

//REGISTRO Y LOGIN DE USUARIO
Route.post('usuario/crear', 'UsuariosController.store')
Route.post('usuario/login', 'UsuariosController.login')
Route.get('usuario/show', 'UsuariosController.index')
Route.get('Busuario/:id', 'UsuariosController.Buser') //VER USUARIO POR ID

//TODOS LOS DE DENTRO DEL GROUP NECIESITAN TOKEN
Route.group(()=>{
  //RUTAS DE PARTIDA
  Route.resource('partida', 'PartidasController')

  //RUTAS BARCO
  Route.resource('barco', 'BarcosController')
  Route.post('barcoj1', 'BarcosController.storej1')
  Route.post('barcoj2', 'BarcosController.storej2')
  Route.post('ganador/:id', 'BarcosController.verGanador')
  Route.post('estado/:id', 'BarcosController.estadoBarco')

  //RUTAS DETALLE
  Route.resource('detalle', 'DetallesController')
  Route.get('ususarioPartidas/:id', 'DetallesController.Bganador')


  //RUTA AUTH ADMIN
  Route.get('admin', 'UsuariosController.IsAdmin')
  Route.get('admin2', 'UsuariosController.IsAdmin2')

  //RUTAS ROL
  Route.resource('rol', 'RolsController')

  //RUTAS USUARIO
  Route.resource('usuario','UsuariosController')
  Route.put('usuarioRol/:id', 'UsuariosController.updateRolToAdmin') //ACTUALIZAR ROL DE USUARIO A ADMIN
  Route.post('logout', 'UsuariosController.logout') //CERRAR SESIÓN
  
}).prefix('api').middleware('auth');