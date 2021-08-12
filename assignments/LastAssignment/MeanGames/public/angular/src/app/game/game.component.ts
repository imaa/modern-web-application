import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../game-list/Game';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


  private _game: Game = new Game();
  public get game(): Game {
    return this._game;
  }
  public set game(v: Game) {
    this._game = v;
  }


  constructor(private gameService: GamesService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadGame(this.router.snapshot.params["id"]);

  }
  loadGame(id: string) {
    this.gameService.getGame(id).subscribe(this.getGameSuccess.bind(this), () => { })
  }
  private getGameSuccess(game: Game) {
    console.log(game);
    this.game = game;
  }
}
