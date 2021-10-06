import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faHandPeace } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.scss' ]
})
export class AuthComponent {
  isLoadingSpinner = false;
  faHandPeace = faHandPeace;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    this.isLoadingSpinner = true;

    this.authService.login(
      form.value.login,
      form.value.password
    ).subscribe(() => {
      this.router.navigate([ '' ]);
      this.isLoadingSpinner = false;
    }, errMsg => {
      this.toastr.error(errMsg);
      this.isLoadingSpinner = false;
    });

    form.reset();
  }
}
