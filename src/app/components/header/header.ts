import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth';

@Component({
  selector: 'app-header',
  imports:  [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HomeComponent {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
