import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MovieComponent } from './movie.component';
import { HomeComponent } from './home/home.component';
import { MoviedetailComponent } from './moviedetail/moviedetail.component';
// import { LoginComponent } from './login/login.component';

// const routes: Routes = [
//   {
//     path: '',
//     component: MovieComponent,
//     children: [
//       { path: '', redirectTo: 'home' },
//       { path: 'home', component: HomeComponent },
//       { path: 'moviedetail', component: MoviedetailComponent },
//       { path: 'login', component: LoginComponent }
//     ]
//   }
// ];

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
    children: [
      { path: '', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'moviedetail/:code', component: MoviedetailComponent }
    ]
  }
];

// @NgModule({
//   declarations: [MovieComponent, HomeComponent, MoviedetailComponent, LoginComponent],
//   imports: [
//     CommonModule,
//     HttpModule,
//     FormsModule,
//     ReactiveFormsModule,
//     RouterModule.forChild(routes)
//   ],
//   bootstrap: [MovieComponent]
// })
@NgModule({
  declarations: [MovieComponent, HomeComponent, MoviedetailComponent],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  bootstrap: [MovieComponent]
})
export class MovieModule { }
