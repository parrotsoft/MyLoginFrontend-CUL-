import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  datosUsuario!: any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.datosUsuario = this.authService.getDataToken();
  }

  onCerrarSesion() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }

}
