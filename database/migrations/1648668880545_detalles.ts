import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Detalles extends BaseSchema {
  protected tableName = 'detalles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('partida').unsigned().references('id').inTable('partidas').notNullable()
      table.integer('ganador').unsigned().references('id').inTable('usuarios').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
