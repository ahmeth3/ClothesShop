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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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

    let selectedUser = new User('', '');

    this.userService.login(this.user.email).subscribe(
      (res: User) => {
        selectedUser = res;

        this.loginErrorHandler(selectedUser);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  loginErrorHandler(selectedUser: User): void {
    if (selectedUser === null) {
      selectedUser = new User('', '');
    }

    if (
      selectedUser.email === this.email.value &&
      selectedUser.password === this.password.value
    ) {
      document.getElementById('closeButton').click();
    } else {
      if (selectedUser.password != this.password.value)
        this.loginForm.controls['password'].setErrors({ incorrect: true });
      if (selectedUser.email != this.email.value)
        this.loginForm.controls['email'].setErrors({ incorrect: true });
    }
  }

  mapFormValuesToUser() {
    this.user.email = this.email.value;
  }
}
