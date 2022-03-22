import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Libros extends BaseSchema {
  protected tableName = 'libro'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('titulo',50).notNullable().unique()
      table.string('sinopsis',300).notNullable()
      table.string('portada').notNullable()
      table.integer('stock').notNullable()
      table.integer('editorial').unsigned().references('id').inTable('editorial').notNullable()
      table.integer('categoria').unsigned().references('id').inTable('categoria').notNullable()
      table.integer('autor').unsigned().references('id').inTable('autor').notNullable()
      table.integer('ubicacion').unsigned().references('id').inTable('ubicacion').notNullable()
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
