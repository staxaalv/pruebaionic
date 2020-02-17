import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../shared/user.class";
import{NavController} from "@ionic/angular"
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User= new User;
  
  constructor(private authService: AuthService,private router:Router, private navController:NavController ) { }

  ngOnInit() {
  }

  /*async onLogin(){
    const user=await this.authService.onLogin(this.user);
    if(user){
      console.log('se ha logueado usuario');
      this.router.navigateByUrl('/home');
    }
  }*/
  public login() {
    this.authService.login(this.user).then((data: any) => {
    this.navController.navigateRoot("home");
    }).catch(err => {
      console.log("error");
      console.log(err);
    })
  }

}

