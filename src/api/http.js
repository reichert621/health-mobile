import { assign } from 'lodash';

// TODO: support non-localhost API
export const BASE_URL = 'https://beok.herokuapp.com';
// export const BASE_URL = 'http://localhost:3000';
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

const getHttpConfig = (options = {}) => {
  return assign(
    {
      method: GET,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    },
    options
  );
};

const isAuthorized = res => {
  if (res.status === 401) {
    // TODO: this might be a temporary hack to handle unauthorized access
    const err = assign(new Error('Not authorized!'), { status: 401 });

    throw err;
  }

  return res.json();
};

const validate = res => {
  if (res.error || res.status >= 400) {
    throw new Error(res.error || res.status);
  }

  return res;
};

const request = (endpoint, config) => {
  return fetch(endpoint, config)
    .then(isAuthorized)
    .then(validate);
};

export const get = endpoint => {
  const url = BASE_URL + endpoint;
  const config = getHttpConfig();

  return request(url, config);
};

export const post = (endpoint, body = {}) => {
  const url = BASE_URL + endpoint;
  const config = getHttpConfig({
    method: POST,
    body: JSON.stringify(body)
  });

  return request(url, config);
};

export const put = (endpoint, body) => {
  const url = BASE_URL + endpoint;
  const config = getHttpConfig({
    method: PUT,
    body: JSON.stringify(body)
  });

  return request(url, config);
};

export const del = endpoint => {
  const url = BASE_URL + endpoint;
  const config = getHttpConfig({
    method: DELETE
  });

  return request(url, config);
};
