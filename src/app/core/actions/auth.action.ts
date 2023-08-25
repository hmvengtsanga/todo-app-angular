
import { AuthUser } from 'src/app/core/interfaces/auth-user';

export class LoginUser {
    static readonly type = '[Auth] Store authenticated user';

    constructor(public payload: {email:string; password: string}) {}
}

export class RefreshUserToken {
    static readonly type = '[Auth] Refresh authenticated user';

    constructor(public refreshToken: string) {}
}

export class LogoutUser {
    static readonly type = '[Auth] logout user';
}