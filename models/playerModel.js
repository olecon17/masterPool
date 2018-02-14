const Sequelize = require('sequelize');
const db = require('../db');

const Player =  db.define('player', {
        playerId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        playerName: {
            type: Sequelize.STRING
        },
        r1: {
            type: Sequelize.STRING
        },
        r2: {
            type: Sequelize.STRING
        },
        r3: {
            type: Sequelize.STRING
        },
        r4: {
            type: Sequelize.STRING
        },
        thru: {
            type: Sequelize.STRING
        },
        today: {
            type: Sequelize.STRING
        },
        to_par: {
            type: Sequelize.STRING
        },
        total: {
            type: Sequelize.STRING
        }
    });


module.exports = Player;