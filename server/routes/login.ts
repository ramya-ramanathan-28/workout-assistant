import {
  my_client_id,
  scopes,
  my_client_secret,
  processTokenResponse,
  getToken,
} from './../data_music/config';
import { getUserInfo } from './../data_music/getSpotifyData';
import { httpget, httppost, loginpost } from './../utils/httpfetch';
const redirect_uri = 'http://localhost:5000/redirectCallback';
export const login = (req: any, res: any) => {
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      my_client_id +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirect_uri)
  );
};

export const redirectCallback = async (req: any, res: any) => {
  const code = req.query.code;
  const error = req.query.error;
  if (code && !error) {
    let response;
    try {
      response = await loginpost({ code, redirect_uri });
      processTokenResponse(response);
      res.redirect('http://localhost:3000?loggedin=true');
    } catch (error) {
      response = error;
      console.log('error');
      res.send(response);
    }
  }
};

export const refreshToken = async (refresh_token) => {
  let response;
  try {
    response = await loginpost({ refresh_token });
    processTokenResponse(response);
  } catch (error) {
    response = error;
    console.log('error');
  }
};

export const isLoggedIn = async function (req, res) {
  const userInfo = await getUserInfo();
  const isLoggeIn = !!getToken();
  if (isLoggeIn) {
    res.send({
      isLoggedIn: isLoggeIn,
      userName: userInfo.data.display_name,
      profilePicLink: userInfo.data.images[0].url,
    });
  } else {
    res.send({ isLoggedIn: false });
  }
};
