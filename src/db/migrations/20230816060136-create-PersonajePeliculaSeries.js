'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('Personajes_perliculaSeries', {
     id: {
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
       type: Sequelize.INTEGER
     },
     createdAt: {
       allowNull: false,
       type: Sequelize.DATE
     },
     updatedAt: {
       allowNull: false,
       type: Sequelize.DATE
     },
     personajeId: {
       allowNull: false,
       references: { model: 'Personajes', key: 'id' },
       type: Sequelize.INTEGER
     },
     peliculaSerieId: {
       allowNull: false,
       references: { model: 'PeliculaSeries', key: 'id' },
       type: Sequelize.INTEGER
     }
   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Personajes_perliculaSeries');
  }
};
