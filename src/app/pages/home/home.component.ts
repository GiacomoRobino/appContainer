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
  @ViewChild('appPreviewContainer') appPreviewContainer: any;
  appButtonElementsArray : any;
  appPreviewElement: any;
  appNamesList = ["organizer", "matrix", "particleNetwork", "hourglass"];
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
    let fadeTime = 400;
    this.exitAnimation(fadeTime);
    setTimeout(() => {
    this.router.navigate(['apps'], { queryParams: { appName: appName } });
    }, fadeTime);
  }

  selectRandomItem(){
    let appButtonElementsArray = this.selectableButton.map((nativeElement:any) => nativeElement.nativeElement);
    let validIndex = Math.floor(Math.random() * appButtonElementsArray.length);
    appButtonElementsArray.forEach((element:any, index:number) => {
      if(index <= validIndex){
      this.selectItem(element, appButtonElementsArray[index-1], index, validIndex);
      }
    
  });

  }
  selectItem(element:any, previousElement:any, index:number, validIndex:number){
    setTimeout(()=>{
      if(previousElement !== undefined){
        previousElement.classList.remove("selected-item");
      }
      element.classList.add("selected-item");
      if(index === validIndex){
        this.goToApp(this.appNamesList[index])
      }
      }, 170 * index
      )
  }

  
  onMouseEnter(row : number) {
    this.enterPreviewAnimation(row);
  }
  onMouseLeave() { 
    this.exitPreviewAnimation();
  }

  enterPreviewAnimation(row: number) {let tl = gsap.timeline();
    let rows = this.getRow(row);
    let element = this.appPreviewContainer.nativeElement;
    console.log(rows);
    element.style.gridRowStart = rows.start;
    element.style.gridRowEnd = rows.end;
    tl.to(this.appPreviewContainer.nativeElement, {duration: 0.1, width:"100%", ease: Power4.easeIn});
    tl.to(this.appPreviewContainer.nativeElement, {duration: 0.3, height:"100%", ease: Power4.easeIn}, ">");
  }

  getRow(row:number){
    let totalRows = 6;
    let result = {start: 2, end: 5};
    if(row > 1 && row < totalRows){
      result.start = result.start - 2 + row;
      result.end = result.start + 3;
    }
    else if(row === totalRows){
      result.start = result.start - 3 + row;;
      result.end = result.start + 3;
    }
    return result;
  }

  exitPreviewAnimation() {let tl = gsap.timeline();
    tl.to(this.appPreviewContainer.nativeElement, {duration: 0.1, width:"0%", ease: Power4.easeIn});
    tl.to(this.appPreviewContainer.nativeElement, {duration: 0.1, height:"0%", ease: Power4.easeIn}, ">");
  }

}
