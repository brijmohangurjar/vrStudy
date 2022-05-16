import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/api-services';
import { ToastService } from 'src/app/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.createForm();
  }


  public loginSubmit(): void {
    const formValue = this.loginForm.value;
    this.loginService.logInUser(formValue.email.toLowerCase(), formValue.password)
      .then((logInResponse: any) => {
        if (logInResponse.status === 200) {
          this.router.navigate(['home']);
          this.toastService.successToast(logInResponse.message);
        } else {
          this.toastService.errorToast(logInResponse.message);
        }
      }, (error: HttpErrorResponse) => {
        console.log('error', error);
        this.toastService.errorToast(error.message);
      });
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
