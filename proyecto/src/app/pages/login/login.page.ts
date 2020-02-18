import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../shared/user.class";
import{NavController} from "@ionic/angular"
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User= new User;
  userUid:String="";
  
  constructor(private authService: AuthService,private router:Router, private navController:NavController,private storage: Storage) { }

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
    var x=this.authService.login(this.user).then((data: any) => {
      this.storage.set('userUid',data.uid );
      this.userUid=data.uid;
      console.log(data.uid);
      this.authService.getDbUser(data.uid).subscribe(res=>{
        console.log("obteniendo de la base de datos");
        console.log(res);
        this.storage.set('nombre', res["nombre"]);
        this.storage.set('apellido', res["apellido"]);
        this.storage.set('celular', res["celular"]);
        this.storage.set('fechanacimiento', res["fechanacimiento"]);
        this.storage.set('email', res["email"]);

        

      })
      this.navController.navigateRoot("home");
      }).catch(err => {
        console.log("error");
        console.log(err);
      });
  }
}

