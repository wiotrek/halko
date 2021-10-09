import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/sites/main/main.service';

@Component({
  selector: 'app-main',
  template: `
    <div class="wrapper">
      <div>
        <app-main-sales [editModeOn]="editModeOn"></app-main-sales>
      </div>
      <div>
        <app-main-expenses [editModeOn]="editModeOn"></app-main-expenses>
      </div>
      <div>
        <app-main-statistics [editModeOn]="editModeOn"></app-main-statistics>
      </div>
    </div>
  `,
  styleUrls: [ 'main.component.scss' ]
})
export class MainComponent implements OnInit {
  editModeOn = true;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.checkChoiceDate();
  }

  private checkChoiceDate(): void {
    this.mainService.editModeOn.subscribe(res => {
      this.editModeOn = res;
    });
  }
}
