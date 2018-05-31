import { Router } from 'express';
import pinsRouter from './pins';
import playerGameRouter from './playergame';
import authRouter from './auth';
import playersRouter from './players';
import gameRouter from './game';
import contactRouter from './contactform';

import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

router.use('/auth', authRouter);
router.use('/contact', contactRouter);


router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use('/playergame', playerGameRouter);
router.use('/pins', pinsRouter);
router.use('/players', playersRouter);
router.use('/game', gameRouter);

export default router;