import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Rol from 'App/Models/Rol'

export default class RolSeeder extends BaseSeeder {
  public async run () {
    await Rol.createMany([
      {
        rol: 'Admin'
      },
      {
        rol: 'cliente'
      }
    ])
  }
}
