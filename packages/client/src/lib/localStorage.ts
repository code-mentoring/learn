enum LSKeys {
  token ='token'
}
export abstract class LocalStorage {
  static get token() { return window.localStorage.getItem(LSKeys.token); }

  static set token(v: string | null) {
    if (!v) window.localStorage.removeItem(LSKeys.token);
    else window.localStorage.setItem(LSKeys.token, v);
  }
}
