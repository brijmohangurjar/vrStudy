import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService} from '../../api-service/user.service';
import {MatSnackBarService} from '../../service/mat-snack-bar.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  public loading = false;

  public loginForm: FormGroup;
  constructor( 
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private matSnackBarService: MatSnackBarService
    ){
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }
  
  public logInUser(): void {
    const formValue = this.loginForm.value;
    this.userService.logInUser(formValue.email, formValue.password)
      .then((logInResponse: any) => {
        if (logInResponse.status === 200) {
          this.router.navigate(['dashboard']);
          this.matSnackBarService.showSuccessSnackBar(logInResponse.message);
        } else {
          this.loading = false;
          this.matSnackBarService.showErrorSnackBar(logInResponse.message);
        }
      }, (error: HttpErrorResponse) => {
        this.loading = false;
        console.log('error', error);
        this.matSnackBarService.showErrorSnackBar(error.message);
      });
  }
 }
