import { Router } from 'express';
import Table from '../table';

let router = Router();

let game = new Table('game');

router.get('/', (req, res) => {
    game.getAllGames()
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    game.getOne(id)
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
});






export default router;