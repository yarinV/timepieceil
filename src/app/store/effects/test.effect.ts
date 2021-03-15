import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class TestEffects {
  constructor(private actions$: Actions) {}
}
