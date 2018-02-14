
const Player = require('./playerModel');
const Entry = require('./entryModel');

Player.belongsToMany(Entry, {through: 'EntryPlayers', foreignKey: 'playerId'});

module.exports = {
  Player, Entry,
};