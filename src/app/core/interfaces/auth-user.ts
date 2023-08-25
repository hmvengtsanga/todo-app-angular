export interface AuthUser {
    lastname: string;
    firstname: string;
    roles?: string[];
    token: string;
    refreshToken: string;
}
