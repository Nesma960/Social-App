import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { UserDataResponse } from '../../core/models/user-data.interface';
import { UiDesignComponent } from "../ui-design/ui-design.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, UiDesignComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder)

  errMsg: string = '';

  loading: boolean = false;

  loginSub$: Subscription = new Subscription();

  loginForm!: FormGroup;

  loginFormInit() {
    //! this.fb.nonNullable.group ==> When constructing a control, it will be non-nullable, and will reset to its initial value.
    this.loginForm = this.fb.nonNullable.group({


      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],


    })

  }
  ngOnInit(): void {
    this.loginFormInit()
  }



  submitForm() {

    if (this.loginForm.valid) {

      this.loading = true;

      this.loginSub$.unsubscribe();

      this.loginSub$ = this.authService.signIn(this.loginForm.value).subscribe({
        next: (res: UserDataResponse) => {

          if (res.success) {
            // save token in localstorage 
            localStorage.setItem("socialToken", res.data.token);
            localStorage.setItem("userData", JSON.stringify(res.data.user));

            //! reset the controls ==> Resets the FormGroup, marks all descendants pristine and untouched and sets the value of all descendants to their default values, or null if no defaults were provided.
            this.loginForm.reset();
            // redirect to login
            //^ programming Router 
            setTimeout(() => {
              this.router.navigate(['/feed'])
            }, 1000);

          }
        },
        error: (err: HttpErrorResponse) => {
          // show errors
          this.errMsg = err.error.message
          this.loading = false
        },
        complete: () => {
          this.loading = false;
        }
      })

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  showPass(ele: HTMLInputElement): void {
    if (ele.type === "password") {
      ele.type = "text"
    } else {
      ele.type = "password"
    }
  }

}
