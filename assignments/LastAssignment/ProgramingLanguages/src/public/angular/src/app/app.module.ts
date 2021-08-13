import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { ProgramingLanguageListComponent } from './programing-language-list/programing-language-list-component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { registerLocaleData } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgramingLanguageService } from './services/programing-languages.service';
import { RatingComponent } from './rating/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MeanHttpInterceptorService } from './interceptor/mean-http-interceptor.service';
import { ProgramingLanguageComponent } from './programingLanguage/programingLanguage.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    WelcomeComponent,
    ProgramingLanguageListComponent,
    RegisterComponent,
    ProfileComponent,
    ProgramingLanguageComponent,
    RatingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'pls',
        component: ProgramingLanguageListComponent,
      },
      {
        path: 'pls/:id',
        component: ProgramingLanguageComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ]),
    HttpClientModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: MeanHttpInterceptorService, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
