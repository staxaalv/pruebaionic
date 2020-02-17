import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../shared/user.class";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user:User=new User;
  constructor(private authService: AuthService,private router:Router ) { }

  ngOnInit() {}

  async onRegister(){
    const userx=await this.authService.onRegister(this.user);
    if(userx){
      console.log('usuario a sido creado '+userx.user.uid);
      
      const userdb=await this.authService.guardarDb(this.user,userx.user.uid);
      if(userdb!=null){
        console.log("usuario ha sido agregado a la base de datos");
      }
      this.router.navigateByUrl('/home');
    }
  }
}
