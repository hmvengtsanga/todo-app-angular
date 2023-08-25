import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs';

import { StartLoading, StopLoading } from 'src/app/core/actions/loading.action';

export interface LoadingStateModel {
  loading: boolean;
}

@State<LoadingStateModel>({
  name: 'loadingApp',
  defaults: {
    loading: false
  }
})
@Injectable()
export class LoadingState {

    constructor() {}

    @Selector()
    static isLoading(state: LoadingStateModel): boolean {
        return !!state.loading;
    }

    @Action(StartLoading)
    startLoading(ctx: StateContext<LoadingStateModel>, action: StartLoading) {
      const state = ctx.getState();
      ctx.patchState({
        ...state,
        loading: true
      });
    }

    @Action(StopLoading)
    stopLoading(ctx: StateContext<LoadingStateModel>, action: StopLoading) {
      const state = ctx.getState();
      ctx.patchState({
        ...state,
        loading: false
      });
    }
}