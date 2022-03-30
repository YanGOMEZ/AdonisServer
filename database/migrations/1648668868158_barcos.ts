import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Barcos extends BaseSchema {
  protected tableName = 'barcos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('partida').unsigned().references('id').inTable('partidas').notNullable()
      table.integer('jugador').unsigned().references('id').inTable('usuarios').notNullable()
      table.integer('barco').notNullable()
      table.string('posicion',2).notNullable()
      table.string('derribado',2).defaultTo('NO').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
