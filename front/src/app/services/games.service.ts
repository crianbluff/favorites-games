import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/Game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GamesService {

  API_URI = 'http://localhost:3000/api';

  constructor( private http:HttpClient ) {
  }
  
  getGames():Observable<Game> {
    return this.http.get(`${ this.API_URI }/games`);
  }

  getGame(id:string):Observable<Game> {
    return this.http.get(`${ this.API_URI }/games/${ id }`);
  }

  deleteGame(id:string):Observable<Game> {
    return this.http.delete( `${ this.API_URI }/games/${ id }`);
  }

  saveGame(game:Game):Observable<Game> {
    return this.http.post( `${ this.API_URI }/games`, game );
  }

  udpateGame(id:string|number, udpatedGame:Game):Observable<Game> {
    return this.http.put( `${ this.API_URI }/games/${ id }`, udpatedGame );
  }

}