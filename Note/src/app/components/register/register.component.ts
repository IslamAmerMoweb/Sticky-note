import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  hide = true;
  constructor(
    private _Fb: FormBuilder,
    private _Toastr: ToastrService,
    private _Auth: AuthService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  createForm(): void {
    this.registerForm = this._Fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/),
        ],
      ],
      age: ['', [Validators.required]],
    });
  }

  getData(formData: FormGroup): void {
    this._Auth.register(formData.value).subscribe((res) => {
      console.log(res);
      if (res.apiStatus == 'success') {
        this._Toastr.success('user adedd succefull', 'good Day');
        this._Router.navigate(['/login']);
      } else {
        this._Toastr.error(res.message, 'invalid data');
      }
    });
  }

  get(name: string, err: string): boolean {
    return this.registerForm.get(`${name}`)!.hasError(`${err}`);
  }
}
