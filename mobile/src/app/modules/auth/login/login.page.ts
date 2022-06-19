import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public loginLoading = false;;

  public validationUserMessage = {
    email: [
      { type: 'required', message: 'Please enter your Email' },
      { type: 'pattern', message: 'The Email entered is Incorrect.Try again' }
    ],
    password: [
      { type: 'required', message: 'please Enter your Password!' },
      { type: 'minlength', message: 'The Password must be at least 5 characters or more' }
    ]
  };

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
    this.loginLoading = true;
    this.loginService.logInUser(formValue.email.toLowerCase(), formValue.password)
      .then((logInResponse: any) => {
        this.loginLoading = false;
        if (logInResponse.status === 200) {
          this.router.navigate(['base']);
          this.toastService.successToast(logInResponse.message);
        } else {
          this.toastService.errorToast(logInResponse.message);
        }
      }, (error: HttpErrorResponse) => {
        this.loginLoading = false;
        console.log('error', error);
        this.toastService.errorToast(error.message);
      });
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ]))
    });
  }
}
