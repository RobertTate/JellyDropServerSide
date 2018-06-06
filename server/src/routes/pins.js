import { Router } from 'express';
import Table from '../table';

let router = Router();

let pins = new Table('pins');
let playergame = new Table('playergame');



router.post('/', (req, res) => {
    let row = { latitude: req.body.lat, longitude: req.body.long, game_ok_id: req.body.gameId, playergame_ok_id: req.body.playerGameId }
    pins.insert(row)
    .then((result) => {
        res.sendStatus(200);
        playergame.scoreChangeForPinDrop(row)
        .then((result) =>{
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
});

router.put('/:id', (req, res) => {
    console.log('PIN ID')
    console.log(id)
    let id = req.params.id;
    let row = { playergame_ok_id: req.body.playerGameId };
    pins.updatePin(id, row)
    .then((player) => {
        res.sendStatus(200);
        playergame.scoreChangeForPinPickup(row)
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
});


router.get('/', (req, res) => {
   pins.getAllPins()
   .then((pins) => {
    res.json(pins);
   }).catch((err) => {
       console.log(err);
   });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    pins.getOne(id)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});






export default router;