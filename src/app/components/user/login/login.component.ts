import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() modalDismissed: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    document.getElementById('openModalButton').click();
  }

  public modalDismissedHandler(): void {
    this.modalDismissed.emit();
  }
}
