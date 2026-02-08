import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  pin: string[] = [];

  constructor(private router: Router) {}

  pressNumber(num: string) {
    if (this.pin.length < 4) {
      this.pin.push(num);
    }
  }

  clear() {
    this.pin.pop();
  }

  login() {
    if (this.pin.join('') === '1234') {
      this.router.navigate(['/dashboard']); // 🔥 redirect here
    } else {
      alert('Invalid PIN');
      this.pin = [];
    }
  }
}
