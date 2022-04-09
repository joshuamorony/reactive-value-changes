import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface HomeState {}

@Injectable()
export class HomeStore extends ComponentStore<HomeState> {
  readonly fieldOneValueChangesEffect = this.effect<string>(($) => $);

  // readonly subscribeTo = this.effect<unknown>(($) => $);

  constructor() {
    super();
  }
}
