
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments('id')

        tbl.string('username')
            .unique()
            .notNullable()

        tbl.string('password')
            .notNullable()
    })
    .createTable('posts', tbl => {
        tbl.increments('id')

        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        tbl.string('title')
            .notNullable()
            .unique()

        tbl.string('content')
            .notNullable()
    })
    .createTable('comments', tbl => {
        tbl.increments('id')

        tbl.string('body')
            .notNullable()

        tbl.integer('post_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('posts')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
    .createTable('replies', tbl => {
        tbl.increments('id')

        tbl.string('body')
            .notNullable()

        tbl.integer('comment_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('comments')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')

        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('replies')
        .dropTableIfExists('comments')
        .dropTableIfExists('posts')
        .dropTableIfExists('users')
  
};
