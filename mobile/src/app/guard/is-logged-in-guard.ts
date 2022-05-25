import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConstantVariables } from 'src/const/constant';
import { LoginService } from '../api-services';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private loginService: LoginService,
    public constVar: ConstantVariables
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user: any) => {
        if (user) {
          this.loginService.getUserByAuthIdWithPromise(user.uid)
            .then((userData: any) => {
              console.log('userData', userData);
              if (userData && userData.length) {
                this.router.navigate(['home']);
                resolve(false);
              } else {
                localStorage.clear();
                this.afAuth.signOut();
                this.router.navigate(['login']);
                resolve(false);
              }
            });
        } else {
          resolve(true);
        }
      });
    });
  }
}

