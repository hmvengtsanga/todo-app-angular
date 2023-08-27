
import { UserDto } from 'src/app/modules/login/models/user.model'

export class CreateUser {
    static readonly type = '[Users] create user';

    constructor(public payload: UserDto) {}
}