import { AuthService } from './../services/auth.service';
import { GetIpService } from './../services/get-ip.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  errors: Boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private getIpService: GetIpService) { }

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.minLength(6), Validators.required]],
  });

  ngOnInit(): void {
  }

  async onClick(email: string, password: string) {
    if (this.profileForm.controls.password?.errors?.required || this.profileForm.controls.password?.errors?.minlength) {
      this.errors = true;
    } else {
      await this.authService.signup(email, password);
      if (this.authService.isLoggedIn) {
      }
    }
    console.log("Email: ", email, "Password: ", password);
  }


  onClickSignIn() {
    this.getIpService.registration = false;
    this.getIpService.login = true;
  }

}
