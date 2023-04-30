import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;
  loginForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _Auth: AuthService,
    private _Toastr: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.createLogin();
  }

  createLogin() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/),
          Validators.required,
        ],
      ],
    });
  }

  formLogin(form: FormGroup) {
    this._Auth.login(form.value).subscribe((res) => {
      if (res.apiStatus == 'success') {
        const name = res.data.user.first_name;
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('name', name);
        this._Toastr.success(res.message, 'Good Day');
        this._Auth.data();
        this._Router.navigate(['/home']);
      } else {
        this._Toastr.error(res.message, 'invalid data please try again');
      }
    });
  }

  error(err: string, nameErr: string) {
    return this.loginForm.get(err)?.hasError(nameErr);
  }
}
