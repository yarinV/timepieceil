import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { AngularFireModule } from "@angular/fire";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { servicesArr } from "./services/index";
import { AppComponent } from "./app.component";
import { ROUTES } from "./routing/routing";
import { appReducers } from "./store/reducers/app.reducers";
import { TestComponent } from "./components/pages/test/test.component";
import { HeaderComponent } from "./components/layout/header/header.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { NavigationComponent } from "./components/layout/navigation/navigation.component";
import { ApiService } from "./services/api.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ConfigService } from "./services/config.service";

var firebaseConfig = {
  apiKey: "AIzaSyAqjevJf0LdK7jiFDUd9fa6YosH79MpaQU",
  authDomain: "timepieceil.firebaseapp.com",
  databaseURL:
    "https://timepieceil-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "timepieceil",
  storageBucket: "timepieceil.appspot.com",
  messagingSenderId: "382440145983",
  appId: "1:382440145983:web:601d5ef5111be3a531648a"
};

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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    servicesArr,
    {
      provide: APP_INITIALIZER,
      useFactory: (ApiService: ApiService) => {
        return () => ApiService.initApp();
      },
      deps: [ApiService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
