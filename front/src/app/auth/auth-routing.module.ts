import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../components/auth/register/register.component';
import { LoginComponent } from '../components/auth/login/login.component';

const routes:Routes = [
	{
		path: 'register',
		component: RegisterComponent
	},
	
	{
		path: 'login',
		component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]
})

export class AuthRoutingModule {}