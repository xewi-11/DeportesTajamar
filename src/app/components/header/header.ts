import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users-service';
import { AuthService } from '../../auth/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Perfil } from '../../models/perfil';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'] ,
})
export class Header implements OnInit {
  public perfil!: Perfil;

  constructor(private usersService: UsersService, private auth: AuthService, private router: Router) { }


  getUserInfo() {
    this.usersService.getUser().subscribe({
      next: (data) => {
        this.perfil = data;
        console.log('Usuario cargado:', this.perfil);
      },
      error: (error) => {
        console.error('Error al cargar el usuario:', error);
      },
    });
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserProfile() {
    // Lógica para ver el perfil del usuario
    console.log('Ver perfil de usuario...');
  }

  logout() {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
