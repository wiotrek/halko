import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from 'src/app/auth/_models/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Directive({
  selector: '[appHasRole]' // *appHasRole = '["Admin"]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {
    this.authService.user.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    // clear view if no roles
    if (!this.user?.showRole || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }

    this.user?.showRole === 'Admin'
      ? this.viewContainerRef.createEmbeddedView(this.templateRef)
      : this.viewContainerRef.clear();
  }
}
