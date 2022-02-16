import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('header') header: any;
  title = 'app-container';

  onActivate(event: any) {
    this.header.setHome(Object.keys(event.router.rawUrlTree.queryParams).length !== 0);
  }
}
