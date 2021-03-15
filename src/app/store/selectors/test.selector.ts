import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/index.states';

const test = (state: IAppState) => state.test;

export const selectTest = createSelector(
	test,
	(l) => l
);
