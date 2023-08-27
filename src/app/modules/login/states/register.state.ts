import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

import { UserDto } from 'src/app/modules/login/models/user.model'
import { CreateUser } from 'src/app/modules/login/actions/user.action';
import { RegisterService } from 'src/app/modules/login/services/register.service';

export interface RegisterStateModel {
  user: UserDto|null;
}

@State<RegisterStateModel>({
  name: 'register',
  defaults: {
    user: null
  }
})
@Injectable()
export class RegisterState {

    constructor(private registerService: RegisterService) {}

    @Action(CreateUser)
    createUser(ctx: StateContext<RegisterStateModel>, action: CreateUser) {
        return this.registerService.register(action.payload);
    }
}