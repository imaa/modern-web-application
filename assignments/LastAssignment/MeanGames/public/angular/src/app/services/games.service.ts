import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../game-list/Game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private _http: HttpClient) { }

  public getGames(skip:number,limit:number): Observable<Game[]> {
    return this._http.get<Game[]>(environment.apiBaseUrl + 'games?skip='+skip+'&limit='+limit);
  }
  public getGame(id: string): Observable<Game> {
    return this._http.get<Game>(environment.apiBaseUrl + 'games/' + id);
  }
  public deleteGame(id: string): Observable<boolean> {
    return this._http.delete<boolean>(environment.apiBaseUrl + 'games/' + id);
  }
  public saveGame(game: Game): Observable<boolean> {
    return this._http.post<boolean>(environment.apiBaseUrl + 'games', game);
  }
  public updateFullGame(id: string, game: Game): Observable<boolean> {
    return this._http.put<boolean>(environment.apiBaseUrl + 'games/' + id, game);
  }
  public updatePartialGame(id: string, game: Game): Observable<boolean> {
    return this._http.patch<boolean>(environment.apiBaseUrl + 'games/' + id, game);
  }
}
