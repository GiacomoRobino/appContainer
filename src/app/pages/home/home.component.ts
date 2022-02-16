import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, OnDestroy, QueryList} from '@angular/core';
import { Router } from '@angular/router';
import { gsap, Power4 } from 'gsap';
import {ElementRef} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{
  @ViewChildren('appButton') appButton :QueryList<any> = new QueryList;
  @ViewChild('appButtonsContainer') appButtonsContainer: any;
  appButtonElementsArray : any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.appButtonElementsArray = this.appButton.map((nativeElement:any) => nativeElement.nativeElement);
    let tl = gsap.timeline();
    this.appButtonElementsArray.forEach((element:any, index:number) => {
    tl.from(element, {duration: 0.2, x: -1000})});
  }

  exitAnimation(fadeTime:number): void {
    let tl = gsap.timeline();
      tl.to(this.appButtonsContainer.nativeElement, {duration: fadeTime / 1000, x: -1000, ease: Power4.easeOut});
  }

  goToApp(appName: string) {
    let fadeTIme = 400;
    this.exitAnimation(fadeTIme);
    setTimeout(() => {
    this.router.navigate(['apps'], { queryParams: { appName: appName } });
    }, fadeTIme);
  }

}
