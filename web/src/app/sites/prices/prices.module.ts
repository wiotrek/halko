import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PricesComponent } from 'src/app/sites/prices/view/prices.component';
import { PricesAddComponent } from 'src/app/sites/prices/view/prices-add/prices-add.component';
import { PricesListComponent } from 'src/app/sites/prices/view/prices-list/prices-list.component';
import { AdminGuard } from 'src/app/auth/_guards/admin.guard';

@NgModule({
  declarations: [
    PricesComponent,
    PricesListComponent,
    PricesAddComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PricesComponent,
        children: [
          { path: '', component: PricesListComponent },
          {
            path: 'dodaj-telefon',
            component: PricesAddComponent,
            canActivate: [AdminGuard],
          }
        ]
      },
    ])
  ]
})
export class PricesModule {}
