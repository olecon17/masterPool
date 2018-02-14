const Sequelize = require('sequelize');
const db = require('../db');



const Entry =  db.define('entries', {
        entryId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        teamName: {
            type: Sequelize.STRING,
        },
        playerOne: {
            type: Sequelize.INTEGER,
        },
        playerTwo: {
            type: Sequelize.INTEGER,
        },
        playerThree: {
            type: Sequelize.INTEGER,
        },
        playerFour: {
            type: Sequelize.INTEGER,
        },
        playerFive: {
            type: Sequelize.INTEGER,
        },
    });

module.exports = Entry;