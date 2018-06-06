import 'babel-polyfill';
import { join } from 'path';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import stateRouting from './middleware/routing.mw';
import configurePassport from './config/passport';
import EventTable from './events'

const eventTrigger = new EventTable();


let app = express();

app.use(morgan('dev'));

app.use(express.json());

eventTrigger.dailyEvent();
eventTrigger.weeklyBonusEvent();
eventTrigger.weeklyGameEvent();

configurePassport(app);

app.use('/api', routes);

app.use(stateRouting);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
