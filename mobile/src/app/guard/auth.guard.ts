import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../api-services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: LoginService,
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user: any) => {
        console.log('user', user)
        if (user) {
          this.authService.getUserByAuthIdWithPromise(user.uid)
            .then((userData: any) => {
              if (userData && userData.length) {
                resolve(true);
              } else {
                this.router.navigate(['login']);
                resolve(false);
              }
            }, (error: HttpErrorResponse) => {
              this.router.navigate(['login']);
              resolve(false);
              console.log('error', error);
            });
        } else {
          this.router.navigate(['login']);
          resolve(false);
        }
      });
    });
  }
}
