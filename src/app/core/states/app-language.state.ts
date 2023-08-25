import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import { ChangeAppLanguage } from 'src/app/core/actions/app-language.action';

export interface AppLanguageStateModel {
  lang: string;
}

@State<AppLanguageStateModel>({
  name: 'appLanguage',
  defaults: {
    lang: 'en'
  }
})
@Injectable()
export class AppLanguageState {

    constructor() {}

    @Selector()
    static language(state: AppLanguageStateModel): string {
        return state.lang;
    }

    @Action(ChangeAppLanguage)
    changeAppLanguage(ctx: StateContext<AppLanguageStateModel>, action: ChangeAppLanguage) {
      const state = ctx.getState();
      ctx.patchState({
        ...state,
        lang: action.lang
      });
    }
}