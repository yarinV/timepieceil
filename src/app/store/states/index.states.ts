import { IFeatureManager } from "./feature-manager.state";
import {Itest} from "./test.state";

export interface IAppState {
	test: Itest,
  featureManager: IFeatureManager
}
