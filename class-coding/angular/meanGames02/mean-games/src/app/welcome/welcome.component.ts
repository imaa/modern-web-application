import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  private _welcomeMessage: string = 'Welcome to MEAN Games';
  public get welcomeMessage() { return this._welcomeMessage }
  constructor() { }

  ngOnInit(): void { }
}
