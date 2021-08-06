import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../game-list/game-list.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private _http: HttpClient) { }

  public getGames(): Observable<Game[]> {
    return this._http.get<Game[]>(environment.apiBaseUrl + "games");
  }
}
