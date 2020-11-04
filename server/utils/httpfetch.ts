import axios from 'axios';
import queryString from 'querystring';
import request from 'request';
import { getToken } from '../data_music/config';
export async function httpget(req, config = {}) {
  try {
    return await axios.get(req, {
      ...{
        headers: { Authorization: getToken() },
      },
      ...config,
    });
  } catch (error) {
    return error;
  }
}

export async function httppost(url, data, config) {
  try {
    return await axios.post(url, queryString.stringify(data), {
      ...{
        headers: { Authorization: getToken() },
      },
      ...config,
    });
  } catch (error) {
    console.log('error', url);
    console.log(error);
    return error;
  }
}

export async function loginpost(inputParams) {
  const { code, redirect_uri, refresh_token } = inputParams;
  let grant_type = 'authorization_code';
  let form;
  if (refresh_token) {
    form = {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
      client_id: process.env.MYCLIENTID,
      client_secret: process.env.MYCLIENTSECRET,
    };
  } else {
    form = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
      client_id: process.env.MYCLIENTID,
      client_secret: process.env.MYCLIENTSECRET,
    };
  }
  var options = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/x-www-form-urlencoded',
    },
    form: form,
  };
  let promise = new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) {
        reject(error);
        return;
      }
      resolve(body);
    });
  });
  return await promise;
}
