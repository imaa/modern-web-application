import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

private _rating: number = 0;
  @Input() set rating(value: number) {
    this._rating = value;
    this.items = new Array(this._rating);
    console.log("setter");

  }

  public items: Array<number> = new Array();
  constructor() { }

  ngOnInit(): void {
  }

}
