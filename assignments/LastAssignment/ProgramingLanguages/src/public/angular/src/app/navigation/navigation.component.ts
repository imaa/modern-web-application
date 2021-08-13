import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from './User';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public user:User = new User();
  constructor( public userService :UserService,private router: Router) { }
  login(){
    debugger;
    this.userService.doLogin(this.user).subscribe((data)=>{
      sessionStorage.setItem('token',data.token);
      this.router.navigate(['/']);
    },(error)=>{});
  }
  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
  }

}
