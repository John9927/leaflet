import { AuthService } from './../services/auth.service';
import { GetIpService } from './../services/get-ip.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, public getIpService: GetIpService) { }

  errors: Boolean = false;

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.minLength(6), Validators.required]],
  });

  ngOnInit() {
    this.getIpService.login = true;
  }

  async onClick(email: string, password: string) {
    if (this.profileForm.controls.password?.errors?.required || this.profileForm.controls.password?.errors?.minlength) {
      this.errors = true;
    } else {
      await this.authService.signin(email, password)
      if (this.authService.isLoggedIn) {
      }
    }
  }

  onClickSignUp() {
    this.getIpService.registration = true;
    this.getIpService.login = false;
  }

}
