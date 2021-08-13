import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../services/games.service';
import { UserService } from '../services/user.service';
import { Game } from './Game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {

  private _game : Game=new Game();
  public get game() : Game {
    return this._game;
  }
  public set game(v : Game) {
    this._game = v;
  }

  private _games: Game[]=[];
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

private _success : boolean=false;
public get success() : boolean {
  return this._success;
}
public set success(v : boolean) {
  this._success = v;
}

private _error : string="";;
public get error() : string {
  return this._error;
}
public set error(v : string) {
  this._error = v;
}


  constructor(private gamesService: GamesService,private route:ActivatedRoute,public userService :UserService) { }

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
  edit(game: Game){
    this.game = game;
  }
  deleteGame(game: Game){
   if(confirm("Are you sure you want to delete this game?")){
     this.gamesService.deleteGame(game._id).subscribe(
       (game) => {
         this.getGames();
       },
       (err) => {

       }
     );
   }
  }
  addUpdateGame(form:any){
    if (form.valid) {
      this.success=false;
    this.error="";
    if (this.game._id) {
      this.gamesService.updateFullGame(this.game._id,this.game).subscribe(
        (game) => {
          this.getGames();
          this.success=true;
          this.game=new Game();
          form.resetForm();
        },

        (err) => {
          this.error=err.error;
        }
      );
    }else{
      this.gamesService.saveGame(this.game).subscribe(
      (game) => {
        this.getGames();
        this.success=true;
        this.game=new Game();
        form.resetForm();
      },

      (err) => {
        this.error=err.error;
      }
    );}
    }else
      this.error="Please fill all the required fields";
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
