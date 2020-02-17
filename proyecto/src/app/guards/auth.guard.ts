import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import {AuthService} from "../services/auth.service";
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { NavController} from "@ionic/angular";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(/*private authService: AuthService,private router:Router,*/private aFAuth:AngularFireAuth,private navController:NavController){}

  /*canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): 
    | Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> 
    | boolean 
    | UrlTree {
    if(this.authService.isLogged){
      return true;
    }
    console.log('user no logging -- Access Denied');
    this.router.navigateByUrl('/login');
    return false;
    //return true;
  }*/
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.aFAuth.authState.pipe(map(auth => {
      if (isNullOrUndefined(auth)) {
        return true;
      }
      this.navController.navigateRoot("/home");
      return false;
    }));
  }

  
}
