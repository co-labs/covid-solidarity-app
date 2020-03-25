'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MarkersSchema extends Schema {
    up() {
        this.create('markers', (table) => {
            table.increments();
            table.string('name', 60).nullable();
            table.text('message').nullable();
            table.string('phone', 60).nullable();
            table.string('email', 60).nullable();
            table.string('type', 60).nullable();
            table.string('status', 60).nullable();
            table.integer('user_id').unsigned().references('id').inTable('users');
            table.string('address', 60).nullable();
            table.string('lat', 60).nullable();
            table.string('lng', 60).nullable();
            table.json('meta').nullable();
            table.timestamps();
        })
    }

    down() {
        this.drop('markers')
    }
}

module.exports = MarkersSchema
