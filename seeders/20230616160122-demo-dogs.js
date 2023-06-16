'use strict';

const {Column, DataType} = require("sequelize-typescript");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('dog', [{
      id:  1,
      name: "Neo",
      color: "red&amber",
      tail_length: 22,
      weight: 32,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        id: 2,
        name: "Jessy",
        color:  "black&white",
        tail_length: 7,
        weight: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('dog', null, {});
  }
};
