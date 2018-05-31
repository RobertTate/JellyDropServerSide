import { Router } from 'express';
import Table from '../table';

let router = Router();
let playergame = new Table('playergame');

router.get('/:id', (req, res) => {
    let id = req.params.id;
    playergame.getPlayergame(id)
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
});


router.put('/score/:id', (req, res) => {
    let id = req.params.id;
    let row = { total_points: req.body.total_points }
    playergame.updateAdd(id, row)
    .then((result) => {
        res.sendStatus(200)
    }).catch((err) => {
        console.log(err);
    });
});

router.put('/pins/:id', (req, res) => {
    let id = req.params.id;
    let row = { number_pins: req.body.number_pins }
    playergame.updateAdd(id, row)
    .then((result) => {
        res.sendStatus(200)
    }).catch((err) => {
        console.log(err);
    });
});

router.put('/droppedtotal/:id', (req, res) => {
    let id = req.params.id;
    let row = { number_dropped: 1 }
    playergame.updateAdd(id, row)
    .then((result) => {
        res.sendStatus(200)
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/totalscore/:id', (req, res) => {
    let id = req.params.id;
    playergame.getPlayerScore(id)
    .then((score) => {
        res.json(score);
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/leaderboard/:id', (req, res) => {
    let id = req.params.id;
    playergame.getLeaderBoard(id)
    .then((score) => {
        res.json(score);
    }).catch((err) => {
        console.log(err);
    })

})

router.get(`/everyleader/all`, (req, res) => {
    playergame.everyLeader()
    .then((scores) => {
        res.json(scores);
    }).catch((err) => {
        console.log(err);
    })
})

export default router;