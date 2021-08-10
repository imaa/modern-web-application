import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../game-list/Game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private _http: HttpClient) {}

  public getGames(): Observable<Game[]> {
    return this._http.get<Game[]>(environment.apiBaseUrl + 'games');
  }
}
