import { Component, DoCheck, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Links } from 'src/app/shared/models/links.model';

@Component({
  selector: 'app-sub-nav',
  templateUrl: './sub-nav.component.html',
  styleUrls: [ './sub-nav.component.scss' ]
})
export class SubNavComponent implements DoCheck {
  @Input() paths = {} as Links[];

  // name module like telefony or serwis
  // params is unnecessary because is using to slice
  // this name.length + 2 in current url
  @Input() nameModule = '';
  @Input() parent = '';

  activeSite: Links;
  leftOption: Links;
  rightOption: Links;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    // default values
    this.activeSite = this.paths[0];
    this.leftOption = this.paths[2];
    this.rightOption = this.paths[1];
  }

  ngDoCheck(): void {
    this.setPropertyNav(this.router.url);
  }

  setPropertyNav = (currentUrl: string) => {
    // check which path is now
    const currentlyLink = this.paths.find(
      x => x.path === currentUrl.slice(
        this.nameModule.length + 2
      ) || x.path === currentUrl.slice(
        this.parent.length + this.nameModule.length + 3
      )
    );

    // set header
    this.activeSite = currentlyLink;

    // set left link button
    this.leftOption = this.paths[2] === currentlyLink
      ? this.paths[0]
      : this.paths[2];

    // set right link button
    this.rightOption = this.paths[1] === currentlyLink
      ? this.paths[0] : this.paths[1];
  };

  switchSiteNav = (link: string) => {
    this.router.navigate([ `./${link}` ], {relativeTo: this.route});
  };
}
