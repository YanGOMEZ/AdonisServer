import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Partidas extends BaseSchema {
  protected tableName = 'partidas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('jugador1').unsigned().references('id').inTable('usuarios')
      table.integer('jugador2').unsigned().references('id').inTable('usuarios')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
