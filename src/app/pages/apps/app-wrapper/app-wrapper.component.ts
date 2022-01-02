import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss']
})
export class AppWrapperComponent implements OnInit {
  public appName: string = "";
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
   this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.appName = params['appName'];
      });
  }

}
