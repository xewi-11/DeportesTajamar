import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Perfil } from '../../models/perfil';
import { UsersService } from '../../services/users/users-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario',
  imports: [CommonModule],
  templateUrl: './perfil-usuario.html',
  styleUrls: ['./perfil-usuario.css'],
})
export class PerfilUsuario implements OnInit {
  user!: Perfil;
  
  constructor(
    private _userService: UsersService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  loadUserInfo(): void {
    this._userService.getUser().subscribe(result => {
      this.user = result;
      console.log(this.user);
      this.cdr.detectChanges();
    });
  }

  goBack(): void {
    this.router.navigate(['/eventos']);
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }
}