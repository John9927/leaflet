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

  constructor(private fb: FormBuilder, private router: Router, private getIpService: GetIpService) { }

  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', [Validators.minLength(6), Validators.required]],
  });

  ngOnInit(): void {
  }

  onClick(email: string, password: string) {
     if(this.profileForm.controls.password?.errors?.required || this.profileForm.controls.password?.errors?.minlength) {
      this.errors = true;
     } else {
      this.getIpService.email = email;
      this.getIpService.password = password;
      console.log("Email: ", email, "Password: ", password);
     }
  }

  onClickSignIn() {
    this.getIpService.registration = false;
    this.getIpService.login = true;
  }

}
