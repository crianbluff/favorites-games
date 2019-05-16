import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { LoginComponent } from '../components/auth/login/login.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule 
  ],

  providers: [
    AuthService
  ]
})
export class AuthModule { }
