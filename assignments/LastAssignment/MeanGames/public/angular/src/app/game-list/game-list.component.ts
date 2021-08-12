import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../services/games.service';
import { Game } from './Game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {
  private _games!: Game[];
  public get games(): Game[] {
    return this._games;
  }
  private set games(games: Game[]) {
    this._games = games;
  }

  private _isAuthenticated: boolean = false;
  public get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  public set isAuthenticated(v: boolean) {
    this._isAuthenticated = v;
  }

private _skip : number=0;
public get skip() : number {
  return this._skip;
}
public set skip(v : number) {
  this._skip = v;
}

private _limit : number=5;
public get limit() : number {
  return this._limit;
}
public set limit(v : number) {
  this._limit = v;
}
  constructor(private gamesService: GamesService,private route:ActivatedRoute) { }

  ngOnInit(): void {
this.skip =this.route.snapshot.queryParams.skip??0;
this.limit =this.route.snapshot.queryParams.limit??5;
this.getGames();
  }
  previous(){
    this.skip -= this.limit;
    this.getGames();
  }
  next(){
    this.skip += this.limit;
    this.getGames();
  }
  getGames () {
    this.gamesService.getGames(this.skip,this.limit).subscribe(
      (games) => {
        this.games = games;

      },
      (err) => {
       }
    );
  }
}
