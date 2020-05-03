import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() modalDismissed: EventEmitter<any> = new EventEmitter<any>();
  @Output() loginActive: EventEmitter<any> = new EventEmitter<any>();
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {}

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
              Validators.min(6),
              Validators.max(21),
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

  get password() {
    return this.registerForm.get('password');
  }

  public modalDismissedHandler(): void {
    this.modalDismissed.emit();
  }

  public loginActiveHandler(): void {
    this.modalDismissedHandler();
    this.loginActive.emit();
  }
}
