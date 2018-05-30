import { Router } from 'express';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import Table from '../table';
import { generateHash } from '../utils/security';


let router = Router();

let players = new Table('players');

router.get('/me', tokenMiddleware, isLoggedIn, (req, res) => {
    res.json(req.user);
});


router.get('/:id', (req, res) => {
    let id = req.params.id;
    players.getOne(id)
    .then((player) => {
        res.json(player);
    }).catch((err) => {
        console.log(err);
    });
});


router.put('/email/:id', (req, res) => {
    let id = req.params.id;
    let row = { email: req.body.email };
    console.log(req.params);
    console.log(req.body);
    players.update(id, row)
    .then((player) => {
        res.json(player);
    }).catch((err) => {
        console.err(err);
    });
});

//  Still needs to be fixed and tested
router.put('/password/:id', (req, res) => {
    let id = req.params.id;
    
    generateHash(req.body.password)
    .then((hash) => {
        let row = { hash: `${hash}` };
        players.update(id, row)
    }).catch((err) => {
        console.log(err);
    });



})





export default router;