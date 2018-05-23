import { Router } from 'express';
import Table from '../table';

let router = Router();

let pins = new Table('pins');


router.post('/', (req, res) => {
    let row = { location: req.body.location , playergame_ok_id: req.body.playergame_ok_id, game_ok_id: req.body.game_ok_id }
    pins.insert(row)
    .then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    });
});


router.get('/', (req, res) => {
   pins.getAll()
   .then((pins) => {
    res.json(pins);
   }).catch((err) => {
       console.log(err);
   });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let row = { pickedUpBy: req.body.pins.pickedupby, location: null };
    pins.update(id, row)
    .then((player) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    })
    
})





export default router;