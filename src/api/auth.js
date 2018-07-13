import { get, post, del } from './http';

export const signup = params => {
  return post('/api/signup', params).then(res => res.user);
};

export const login = credentials => {
  return post('/api/login', credentials).then(res => res.user);
};

export const isAuthenticated = () => {
  return get('/api/is-authenticated').then(res => res.isAuthenticated);
};

export const logout = () => {
  return del('/api/logout');
};
