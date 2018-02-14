const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

//import db and model config for sequelize
const db = require('./db');
const models = require('./models');

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const router = express.Router();

router.use(function (req, res, next) {
    next();
});

router.get('/', function (req, res) {
    res.json({message: "You're the best"})
});

app.use('/api', router);

router.route('/players')

    .post(function (req, res) {
        fetch('http://samsandberg.com/themasters/')
            .then(res => res.json())
            .then(json => json.players.forEach(function (player) {

                const values = {
                    r1: player['r1'],
                    r2: player['r2'],
                    r3: player['r3'],
                    r4: player['r4'],
                    total: player['tot'],
                    thru: player['thru'],
                    today: player['today'],
                    to_par: player['to_par']
                };
                models.Player.findCreateFind({where: {playerName: player['player']}})
                    .spread((row, created) => {
                        console.log('Entry Created???   ' + created);
                        models.Player.update(values, {where: {playerId: row.playerId}})

                    })
            }));
        res.json({message: 'Updated DB'});
    })

    .get(function (req, res) {
        models.Player.findAll().then(players => {
            res.json({players: players});
        })
    });

router.route('/teams')

    .post(function (req, res) {
        let values = {
            playerOne: req.body.playerOne,
            playerTwo: req.body.playerTwo,
            playerThree: req.body.playerThree,
            playerFour: req.body.playerFour,
            playerFive: req.body.playerFive
        };

        models.Entry.findOrCreate({
            where: {
                teamName: req.body.teamName,
            }
        }).spread((row, created) => {
            if (created) {
                models.Entry.update(values, {where: {entryId: row.entryId}}).then(updatedRow => {
                    res.json({message: 'success', created: created, entry: updatedRow})
                })
            } else {
                res.json({message: 'failure'})
            }
        });

    })

    .get(function (req, res) {
        models.Entry.findAll({}).then(teams => {
            res.json({teams: teams})
        })
    });


router.route('/teams/:team_id')
    .get(function (req, res) {
        models.Entry.find({where: {entryId: req.param('team_id')}, include: [{ model: models.Player, as: 'members'}]}).then(row => {
            res.json({team: row})
        })
    });


app.listen(8080);

db.sync();
