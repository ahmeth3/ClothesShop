import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() modalDismissed: EventEmitter<any> = new EventEmitter<any>();
  @Output() registerActive: EventEmitter<any> = new EventEmitter<any>();
  loginForm: FormGroup;

  user = new User('', '');
  error: string = '';
  success: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    document.getElementById('openModalButton').click();

    this.loginForm = this.fb.group({
      email: [
        'akihalilovic@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['ahmet1997', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public modalDismissedHandler(): void {
    this.modalDismissed.emit();
  }

  public registerActiveHandler(): void {
    this.modalDismissedHandler();
    this.registerActive.emit();
  }

  login() {
    this.mapFormValuesToUser();

    this.userService.login(this.user).subscribe(
      (res) => {
        localStorage.setItem('token', res['jwt'].toString());
        this.loginErrorHandler('200');
      },
      (err) => {
        this.error = err['error'].message;
        this.loginErrorHandler('400');
      }
    );
  }

  loginErrorHandler(statusCode: string): void {
    if (statusCode === '200') document.getElementById('closeButton').click();
    else if (statusCode === '400') {
      if (this.error === 'Wrong password.')
        this.loginForm.controls['password'].setErrors({ incorrect: true });
      if (this.error === 'Email address is wrong.')
        this.loginForm.controls['email'].setErrors({ incorrect: true });
    }
  }

  mapFormValuesToUser() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
  }
}
