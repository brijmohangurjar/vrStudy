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

@Injectable()
export class IsLoggedInGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public constVar: ConstantVariables
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((user: any) => {
        if (user) {
          this.router.navigate(['base']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}

