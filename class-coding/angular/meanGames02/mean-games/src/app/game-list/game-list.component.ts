import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  private _games!: Game[];
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
