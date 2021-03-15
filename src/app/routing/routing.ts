import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { TestComponent } from '../components/pages/test/test.component';

export const ROUTES: Routes = [
	{
		path: '**',
		component: TestComponent,
		data: { },
  },
];
