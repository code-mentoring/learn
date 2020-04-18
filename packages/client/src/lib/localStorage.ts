enum LSKeys {
  token ='token'
}
export abstract class LocalStorage {

  static get token() { return localStorage.getItem(LSKeys.token); }
  static set token(v: string | null) {
    if (!v) localStorage.removeItem(LSKeys.token);
    else localStorage.setItem(LSKeys.token, v);
  }

}
