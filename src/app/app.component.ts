import { Component, ViewChild, OnInit, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('header') header: any;
  @ViewChild('headerComponent') headerComponent: any;
  @ViewChild('router') router: any;
  @ViewChild('serviceWrapper') serviceWrapper: any;
  @HostListener('window:scroll', ['$event']) onScrollEvent() {
    this.createHeaderOffset();
  }

  routerWidth = 0;
  title = 'app-container';
  backgroundCanvas: any;

  ngOnInit(): void {
    
    this.backgroundCanvas = <HTMLCanvasElement>document.querySelector('canvas');
    var ctx = this.backgroundCanvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
  }

  ngAfterViewInit(){
    
    
  }

  onActivate(event: any) {
    this.headerComponent.setHome(Object.keys(event.router.rawUrlTree.queryParams).length !== 0);
  }

  createHeaderOffset(){
    let header = this.header.nativeElement;    
    let sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
      this.routerWidth = this.router.nativeElement.offsetWidth;
      let width = this.routerWidth.toString() + "px";
      header.style.width = width;

      let height = header.offsetHeight.toString() + "px";
      console.log(height);
      this.serviceWrapper.nativeElement.style.marginTop = height;
    } else {
      header.classList.remove("sticky");
      this.serviceWrapper.nativeElement.style.marginTop = "0px";
    }
  }
}
