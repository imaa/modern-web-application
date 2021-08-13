import { Component, OnInit } from '@angular/core';
import { User } from '../navigation/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user:User = new User();
  constructor( private userService:UserService) { }

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
  ngOnInit(): void {
  }
  register(rf:any){
   if (rf.valid) {
      this.userService.register(this.user).subscribe(
      data => {
        this.success = true;
        rf.resetForm();
      },
      error => {
        this.error =  error.error.message ??error.error ;
      }
    );
  }else{
    this.error = "Please fill all the fields";
  }
  }
}
