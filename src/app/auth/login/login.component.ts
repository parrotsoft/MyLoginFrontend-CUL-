import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm() {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  onEnter() {
    if (this.form.valid) {
      this.authService.validateLogin(this.form.get('usuario')?.value, this.form.get('clave')?.value)
          .subscribe((resp: any) => {
            if (resp) {
              this.authService.setTokenLocalStorage(resp.token);
              this.router.navigate(['app/home']);
            }
          }, (error: HttpErrorResponse) => {
            alert(error.error.messaje);
          });
    } else {
      alert('Todos los datos son requeridos...');
    }
  }

}
