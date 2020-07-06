enum LSKeys {
  token ='token',
  onboarding ='onboarding',
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


  // TODO: Move to client, not here
  static get onboarding() { return JSON.parse(window.localStorage.getItem(LSKeys.onboarding) || '{}'); }

  static set onboarding(v: object | null) {
    if (!v) window.localStorage.removeItem(LSKeys.onboarding);
    else window.localStorage.setItem(LSKeys.onboarding, JSON.stringify(v));
  }
}
