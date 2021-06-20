import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit{
  isUserExist = true;

  constructor(
    private router: Router) {}

  ngOnInit(): void {
    this.checkUser();
  }

  private checkUser(): void {
    if (!this.isUserExist) {
      this.router.navigateByUrl('/logowanie');
    }
  }
}
