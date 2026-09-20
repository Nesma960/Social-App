import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { UserDataResponse } from '../../core/models/user-data.interface';
import { UiDesignComponent } from "../ui-design/ui-design.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, UiDesignComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder)

  errMsg: string = '';

  loading: boolean = false;

  registerSub$: Subscription = new Subscription();

  registerForm!: FormGroup;

  registerFormInit() {
    //! this.fb.nonNullable.group ==> When constructing a control, it will be non-nullable, and will reset to its initial value.
    this.registerForm = this.fb.nonNullable.group({

      name: ["", [Validators.required, Validators.minLength(3)]],
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ["", [Validators.required]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      rePassword: ['', [Validators.required]],

    }, { validators: [this.confirmPassword] })

  }
  ngOnInit(): void {
    this.registerFormInit()
  }

  // ^ Custom Validation
  confirmPassword(group: AbstractControl) {
    // ! AbstractControl ==> This is the base class for FormControl, FormGroup, and FormArray.
    // check if pass !== repass --> set error in the repass control (mismatch)
    // if pass == repass --> return null 

    const passwordValue = group.get("password")?.value;
    const rePasswordValue = group.get("rePassword")?.value;

    if (passwordValue !== rePasswordValue && rePasswordValue !== "") {
      group.get("rePassword")?.setErrors({ mismatch: true })
      return { mismatch: true };
    } else {
      return null
    }
  }

  submitForm() {

    if (this.registerForm.valid) {

      this.loading = true;

      this.registerSub$.unsubscribe();

      this.registerSub$ = this.authService.signUp(this.registerForm.value).subscribe({
        next: (res: UserDataResponse) => {
          console.log(res);
          if (res.success) {
            //! reset the controls ==> Resets the FormGroup, marks all descendants pristine and untouched and sets the value of all descendants to their default values, or null if no defaults were provided.
            this.registerForm.reset();
            // redirect to login
            //^ programming Router 
            setTimeout(() => {
              this.router.navigate(['/login'])
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
      this.registerForm.markAllAsTouched();
    }
  }

  showPassword(element: HTMLInputElement): void {
    if (element.type === "password") {
      element.type = "text"
    } else {
      element.type = "password"
    }
  }


}
