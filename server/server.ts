import { config } from 'dotenv';
config();

import cors from 'cors';

import bodyParser from 'body-parser';
import express from 'express';
import { postMessages, putMessage } from './routes/messages';

import { isLoggedIn, login, redirectCallback } from './routes/login';
import { addSongsToPlaylist, getPlaylist, getSongs } from './routes/users';
import { clearToken } from './data_music/config';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// user
app.get('/api/songs', getSongs);

app.get('/api/playlist', getPlaylist);

// Call for addSongsToPlaylistAPI is of the below format
//  fetch('http://localhost:5000/api/addSongsToPlaylist?songIds=2Zgnaip1c876zmBhz9HifI,4CoSCPlKNrWli7E5kFtbcl', { method:'post'}).then((response) =>
//           response.json().then((res) => console.log(res))
// );
app.post('/api/addSongsToPlaylist', addSongsToPlaylist);

// messages
app.post('/api/messages', postMessages);
app.put('/api/messages/:id', putMessage);

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/login', login);
app.get('/logout', clearToken);

app.get('/redirectCallback', redirectCallback);

app.get('/isLoggedin', isLoggedIn);
