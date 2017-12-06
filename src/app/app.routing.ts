import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';

import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  RegisterComponent,
  LoginComponent,
  MoviesComponent
];
