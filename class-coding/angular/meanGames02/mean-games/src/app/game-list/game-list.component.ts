import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  private _games: Game[] = [{
    title: 'Mt. Jack', price: 33.96, year: 2006
  },
  { title: 'Mt. Prittter', price: 22.96, year: 1986 }];
  public get games(): Game[] { return this._games }
  private set games(games: Game[]) {
    this._games = games;
  }
  constructor(private gamesService: GamesService) { }

  ngOnInit(): void {
    this.gamesService.getGames().subscribe((games) => {
      this.games = games;
    }, (err) => { })
  }

}

export class Game {
  title!: string;
  price!: number;
  year!: number;
}
