import { refreshToken as refreshTokenCall } from './../routes/login';
const endpoint: string = '';
let tokencode = '';
let refreshToken = '';
let refreshIntervalId;

export const my_client_id = process.env.MYCLIENTID;
export const my_client_secret = process.env.MYCLIENTSECRET;
export const scopes = 'user-read-private user-read-email user-library-read playlist-modify-private playlist-modify-public user-modify-playback-state';

export function processTokenResponse(res) {
  clearTimeout(refreshIntervalId);
  tokencode = `Bearer ${JSON.parse(res).access_token}`;
  if (JSON.parse(res).refresh_token) {
    refreshToken = JSON.parse(res).refresh_token;
  }

  refreshIntervalId = setTimeout(() => {
    refreshTokenCall(refreshToken);
  }, JSON.parse(res).expires_in * 1000);
}

export function getToken() {
  return tokencode;
}
