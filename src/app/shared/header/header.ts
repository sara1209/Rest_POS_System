import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
 userName: string = 'Joe Hardward';
  userRole: string = 'ADMIN';

  logout() {
    console.log('Logout clicked');
    // Later you can add router navigation or auth service here
  }
}
