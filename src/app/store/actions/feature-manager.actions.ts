import { createAction, props } from '@ngrx/store';
import { IFeatureManager } from '../states/feature-manager.state';
import { Itest } from '../states/test.state';

export const UpdateFeatureManager = createAction(
	'[Feature manager] Update',
	props<{ featureManager: IFeatureManager }>()
);
