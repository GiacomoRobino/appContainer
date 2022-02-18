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
  @HostListener('window:scroll', ['$event']) onScrollEvent() {
    let header = this.header.nativeElement;    
    let sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
      this.routerWidth = this.router.nativeElement.offsetWidth;
      let width = this.routerWidth.toString() + "px";
      console.log(width)
      header.style.width = width;
    } else {
      header.classList.remove("sticky");
    }
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
}
