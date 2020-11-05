import { config } from 'dotenv';
config();

import cors from 'cors';

import bodyParser from 'body-parser';
import express from 'express';
import { postMessages, putMessage } from './routes/messages';

import { isLoggedIn, login, redirectCallback } from './routes/login';
import { getSongs } from './routes/users';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// user
app.get('/api/songs', getSongs);

// messages
app.post('/api/messages', postMessages);
app.put('/api/messages/:id', putMessage);

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/login', login);

app.get('/redirectCallback', redirectCallback);

app.get('/isLoggedin', isLoggedIn);
