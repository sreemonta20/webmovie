// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppComponent } from './app.component';
// import { MovieComponent } from './movie/movie.component';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location, LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';

import { AppComponent } from './app.component';
// import { LoginComponent } from './security/login/login.component';

// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () =>
//       import('./movie/movie.module').then(m => m.MovieModule),
//       data: { preload: true, delay: true }
//   },
//   {
//     path: 'movie',
//     loadChildren: () =>
//       import('./movie/movie.module').then(m => m.MovieModule),
//       data: { preload: true, delay: true }
//   }
// ]
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./security/login/login.module').then(m => m.LoginModule),
    data: { preload: false }
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./security/login/login.module').then(m => m.LoginModule),
    data: { preload: false }
  },
  {
    path: 'movie',
    loadChildren: () =>
      import('./movie/movie.module').then(m => m.MovieModule),
      data: { preload: true, delay: true }
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule, FormsModule,
    ReactiveFormsModule, RouterModule.forRoot(routes),
    ToastNoAnimationModule.forRoot()
  ],
  providers: [Title],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
