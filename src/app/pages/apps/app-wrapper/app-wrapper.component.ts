import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap, Power4 } from 'gsap';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss']
})
export class AppWrapperComponent implements OnInit, AfterViewInit {
  @ViewChild('appContainer') appContainer: any;

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

  ngAfterViewInit(): void {
    let tl = gsap.timeline();
    tl.from(this.appContainer.nativeElement, {duration: 1, x: +2000, ease: Power4.easeOut});
    
  }

}
