export declare abstract class LocalStorage {
    static get token(): string | null;
    static set token(v: string | null);
    static get email(): string | null;
    static set email(v: string | null);
    static get onboarding(): object | null;
    static set onboarding(v: object | null);
}
