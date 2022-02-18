import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, OnDestroy, QueryList} from '@angular/core';
import { Router } from '@angular/router';
import { gsap, Power4 } from 'gsap';
import {ElementRef} from '@angular/core';
import { timeout } from 'd3';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit{
  @ViewChildren('appButton') appButton :QueryList<any> = new QueryList;
  @ViewChildren('selectable') selectableButton :QueryList<any> = new QueryList;
  @ViewChild('appButtonsContainer') appButtonsContainer: any;
  appButtonElementsArray : any;
  sideEscapePoint = 1700;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(): void {
    this.appButtonElementsArray = this.appButton.map((nativeElement:any) => nativeElement.nativeElement);
    let tl = gsap.timeline();
    this.appButtonElementsArray.forEach((element:any, index:number) => {
    tl.from(element, {duration: 0.2, x: -this.sideEscapePoint})});
  }

  exitAnimation(fadeTime:number): void {
    let tl = gsap.timeline();
      tl.to(this.appButtonsContainer.nativeElement, {duration: fadeTime / 1000, x: -this.sideEscapePoint, ease: Power4.easeIn});
  }

  goToApp(appName: string) {
    let fadeTIme = 400;
    this.exitAnimation(fadeTIme);
    setTimeout(() => {
    this.router.navigate(['apps'], { queryParams: { appName: appName } });
    }, fadeTIme);
  }

  selectRandomItem(){
    let appButtonElementsArray = this.selectableButton.map((nativeElement:any) => nativeElement.nativeElement);
    appButtonElementsArray.forEach((element:any, index:number) => {
      this.selectItem(element, appButtonElementsArray[index-1], index);
    
  });

  }
  selectItem(element:any, previousElement:any, index:number){
    setTimeout(()=>{
      if(previousElement !== undefined){
        previousElement.classList.remove("selected-item");
      }
      element.classList.add("selected-item");
      if(index === 3){
        this.goToApp("hourglass")
      }
      }, 500 * index
      )
  }

}
