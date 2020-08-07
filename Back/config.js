const mariaDB = require('../database'); 
const knex = require('knex')(mariaDB); 
const Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;