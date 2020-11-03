import { refreshToken as refreshTokenCall } from './../routes/login';
const endpoint: string = '';
let tokencode = '';
let refreshToken = '';
let refreshIntervalId;

export const my_client_id = process.env.MYCLIENTID;
export const my_client_secret = process.env.MYCLIENTSECRET;
export const scopes = 'user-read-private user-read-email user-library-read';

export function processTokenResponse(res) {
  if (refreshIntervalId) {
    console.log('re', res);
  } else {
    console.log('main', res);
  }
  clearTimeout(refreshIntervalId);
  tokencode = `Bearer ${JSON.parse(res).access_token}`;
  if (JSON.parse(res).refresh_token) {
    refreshToken = JSON.parse(res).refresh_token;
  }
  console.log('settimeout', JSON.parse(res).expires_in);
  refreshIntervalId = setTimeout(() => {
    console.log('settimeout');
    refreshTokenCall(refreshToken);
  }, JSON.parse(res).expires_in * 1000);
}

export function getToken() {
  console.log(tokencode);
  return tokencode;
}
