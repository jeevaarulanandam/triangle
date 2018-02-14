import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import { FlexLayoutModule } from '@angular/flex-layout';

// Project Components
import { AppMaterialModule } from './app.material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BusComponent } from './bus/bus.component';

// Auth Services
import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';


import 'hammerjs';


enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    BusComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  providers: [UserService, AuthGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
