import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './authorization/auth.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: MainComponent },
      { path: 'logowanie', component: AuthComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
