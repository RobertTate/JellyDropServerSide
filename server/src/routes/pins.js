import { Router } from 'express';
import Table from '../table';

let router = Router();

let pins = new Table('pins');



router.post('/', (req, res) => {
    console.log(req.body.lat);
    console.log(req.body.long);
    console.log(req.body.gameId);
    console.log(req.body.playerId);

    let row = { latitude: req.body.lat, longitude: req.body.long, game_ok_id: req.body.gameId, playergame_ok_id: req.body.playerId }
    pins.insert(row)
    .then((result) => {
        res.sendStatus(200);
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

router.put('/', (req, res) => {
    // let id = req.params.id;
    console.log(req.body);
    // let row = { pickedUpBy: req.body.pins.pickedupby, location: null };
    // pins.update(id, row)
    // .then((player) => {
    //     res.sendStatus(200);
    // }).catch((err) => {
    //     console.log(err);
    // })
});





export default router;