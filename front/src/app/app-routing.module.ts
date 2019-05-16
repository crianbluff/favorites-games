import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';

const routes:Routes = [
	{
		path: 'auth',
		loadChildren: './auth/auth.module#AuthModule'
	},
	
	{
		path: 'games',
		component: GameListComponent
  },
  
  {
		path: 'game/add',
		component: GameFormComponent
	},

	{
		path: 'game/edit/:id',
		component: GameFormComponent
	},

	{
		path: '**',
		pathMatch: 'full',
		redirectTo: 'auth'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule {}