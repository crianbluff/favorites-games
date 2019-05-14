import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';

const APP_ROUTES: Routes = [
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
		redirectTo: 'games'
	}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);