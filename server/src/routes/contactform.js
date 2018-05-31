import { config } from '../config';
import { sendEmail } from '../utils/mail';
import { Router } from 'express';

let router = Router();


router.post('/', (req, res, next) => {
    let messageBody = `Name: ${req.body.name}
                        Email: ${req.body.email}
                        Message: ${req.body.message}`;

    sendEmail(config.masterEmail, 'usersubmission@phonetag.io', 'New Contact Form Submission', messageBody)
    .then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        next(err);
    });
});



export default router;