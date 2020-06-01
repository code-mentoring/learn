enum LSKeys {
  token ='token',
  preferences ='preferences',
  email ='email'
}
export abstract class LocalStorage {
  static get token() { return window.localStorage.getItem(LSKeys.token); }

  static set token(v: string | null) {
    if (!v) window.localStorage.removeItem(LSKeys.token);
    else window.localStorage.setItem(LSKeys.token, v);
  }


  static get email() { return window.localStorage.getItem(LSKeys.email); }

  static set email(v: string | null) {
    if (!v) window.localStorage.removeItem(LSKeys.email);
    else window.localStorage.setItem(LSKeys.email, v);
  }


  static get preferences() { return JSON.parse(window.localStorage.getItem(LSKeys.preferences) || '{}'); }

  static set preferences(v: string | null) {
    if (!v) window.localStorage.removeItem(LSKeys.preferences);
    else window.localStorage.setItem(LSKeys.preferences, v);
  }
}
