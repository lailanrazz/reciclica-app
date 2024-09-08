import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { register } from 'src/store/register/register.actions';
import { UserRegister } from 'src/app/model/user/UserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: [''],
      repeatPassword: ['', Validators.required],
      address: this.formBuilder.group({
        street: [''],
        number: [''],
        complement: [''],
        neighborhood: [''],
        zipCode: [''],
        state: [''],
        city: ['']
      })
    });
  }

  register() {
    if (this.registerForm.valid) {
      const userRegister: UserRegister = this.registerForm.value;
      this.store.dispatch(register({ userRegister }));
    }
  }
}
