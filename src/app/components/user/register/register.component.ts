import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() modalDismissed: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginActive: EventEmitter<any> = new EventEmitter<any>();
  registerForm: FormGroup;

  user = new User('', '');
  error: string = '';
  success: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    document.getElementById('openModalButton').click();

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
              Validators.minLength(6),
            ],
          ],
          confirmPassword: ['', [Validators.required]],
        },
        { validator: this.passwordMatchValidator }
      ),
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.controls['password'].value ===
      formGroup.controls['confirmPassword'].value
      ? null
      : { misMatch: true };
  }

  get email() {
    return this.registerForm.get('email');
  }

  get passwordGroup() {
    return this.registerForm.get('passwordGroup');
  }

  get password() {
    return this.registerForm.get('passwordGroup.password');
  }

  get confirmPassword() {
    return this.registerForm.get('passwordGroup.confirmPassword');
  }

  public modalDismissedHandler(): void {
    this.modalDismissed.emit();
  }

  public loginActiveHandler(): void {
    this.modalDismissedHandler();
    this.loginActive.emit();
  }

  register() {
    this.mapFormValuesToUser();

    this.userService.store(this.user).subscribe(
      () => {
        // Inform the user
        this.success = 'Created successfully';

        // Reset the form
        this.registerForm.reset();

        // Close the register form
        document.getElementById('closeButton').click();
      },
      (err) => (this.error = err)
    );
  }

  mapFormValuesToUser() {
    this.user.email = this.email.value;
    this.user.password = this.password.value;
  }
}
