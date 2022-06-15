import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user: any) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['login']);
          resolve(false);
        }
      });
    });
  }
}
