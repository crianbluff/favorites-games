import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTING  } from './app.routes';

// Servicios
import { GamesService } from './services/games.service'

// Componentes
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GameFormComponent } from './components/game-form/game-form.component';
import { GameListComponent } from './components/game-list/game-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    GameFormComponent,
    GameListComponent
  ],

  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule
  ],

  providers: [
    GamesService
  ],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }