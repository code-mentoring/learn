export const CONFIG = {
  localStorageTokenKey: 'token',
  localStorageEmailKey: 'email',
  apiHost: '%%API_HOST%%',
  apiUrl: '/graphql',
  prefix: '',
  isProd: '%%IS_PROD%%'
};

// @ts-ignore
window.config = CONFIG;
