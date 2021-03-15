import { createAction, props } from '@ngrx/store';
import { Itest } from '../states/test.state';

export const UpdateTest = createAction(
	'[test] Update',
	props<{ test: Itest }>()
);
