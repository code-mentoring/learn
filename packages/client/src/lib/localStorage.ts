enum LSKeys {
  token ='token',
  preferences ='preferences'
}
export abstract class LocalStorage {
  static get token() { return window.localStorage.getItem(LSKeys.token); }

  static set token(v: string | null) {
    if (!v) window.localStorage.removeItem(LSKeys.token);
    else window.localStorage.setItem(LSKeys.token, v);
  }

  static get preferences() { return JSON.parse(window.localStorage.getItem(LSKeys.preferences) || '{}'); }

  static set preferences(v: string | null) {
    if (!v) window.localStorage.removeItem(LSKeys.preferences);
    else window.localStorage.setItem(LSKeys.preferences, v);
  }
}
