'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Personajes', [{
      imagen: "prueba1",
      nombre: "prueba1",
      edad: 20,
      peso: 30,
      historia: "prueba1",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Personajes', null, {});
  }
};
