import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Prestamos extends BaseSchema {
  protected tableName = 'prestamos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.integer('libro').unsigned().references('id').inTable('libro').notNullable()
      table.integer('cliente').unsigned().references('id').inTable('usuarios').notNullable()
      table.timestamps()
      table.date('Fecha_Entrega').notNullable()
      table.string('Entregado').defaultTo('NO').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
