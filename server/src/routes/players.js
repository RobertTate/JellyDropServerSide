import { Router } from 'express';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import Table from '../table';
import { generateHash, checkPassword } from '../utils/security';


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
    players.update(id, row)
        .then((player) => {
            res.json(player);
        }).catch((err) => {
            console.err(err);
        });
});


router.put('/password/:id', (req, res) => {
    let id = req.params.id;
    generateHash(req.body.hash)
        .then((hash) => {
            let row = { hash: `${hash}` };
            players.update(id, row);
            res.sendStatus(200);
        }).catch((err) => {
            console.log(err);
        });

})

router.put('/photo/:id', (req, res) => {
    let id = req.params.id;
    let row = { picture: req.body.photo };
    players.update(id, row)
    .then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
    });
});

router.post('/checkpassword/:id', (req, res) => {
    let id = req.params.id;
    players.getOne(id)
        .then((result) => {
            return checkPassword(req.body.password, result.hash)
                .then((result) => {
                    res.json(result);
                }).catch((err) => {
                    console.log(err);
                });
        }).catch((err) => {
            console.log(err);
        });
})





export default router;