import { getToken } from '../data_music/config';
import { httpget } from '../utils/httpfetch';

const MYSONGS = 'https://api.spotify.com/v1/me/tracks';

export const getSongs = async (req: any, res: any) => {
  try {
    const response = await httpget(MYSONGS, {
      headers: { Authorization: getToken() },
    });

    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
