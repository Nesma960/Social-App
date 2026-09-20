import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit {

  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder)

  changePass!: FormGroup;



  ngOnInit(): void {
    this.changePasswordInit()
  }

  changePasswordInit(): void {
    this.changePass = this.fb.nonNullable.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    })
  }

  submitForm(): void {
    if (this.changePass.valid) {
      this.authService.changePassword(this.changePass.getRawValue()).subscribe({
        next: (res) => {

          if (res.message === 'password changed successfully') {
            Swal.fire({
              icon: 'success',
              title: 'Password Changed!',
              text: 'Your password has been changed successfully.',
              confirmButtonText: 'OK'
            });
            this.changePass.reset()

          }
        }
      })
    }
  }


}
