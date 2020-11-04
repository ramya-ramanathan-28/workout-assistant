export default function getmysongs() {}
import { httpget, httppost, loginpost } from './../utils/httpfetch';
const USERINFO = 'https://api.spotify.com/v1/me';
export const getUserInfo = async () => {
  try {
    const response = await httpget(USERINFO);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
