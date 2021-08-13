import { Component, OnInit } from '@angular/core';
import { User } from '../navigation/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _title : string="User Profile";
  public get title() : string {
    return this._title;
  }
  public set title(v : string) {
    this._title = v;
  }

public user : User =new User();

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUserInfo()??new User();
  }

}
