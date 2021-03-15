import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { servicesArr } from './services/index';

import { AppComponent } from './app.component';
import { ROUTES } from './routing/routing';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducers';
import { TestComponent } from './components/pages/test/test.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(appReducers),
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument(),
  ],
  providers: [
    servicesArr,
    {
			provide: APP_INITIALIZER,
			useFactory: (ApiService: ApiService) => {
				return () => ApiService.initApp();
      },
			deps: [ApiService],
			multi: true,
		},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
