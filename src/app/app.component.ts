import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('header') header: any;
  title = 'app-container';
  backgroundCanvas: any;

  ngOnInit(): void {
    
    this.backgroundCanvas = <HTMLCanvasElement>document.querySelector('canvas');
    var ctx = this.backgroundCanvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
  }

  onActivate(event: any) {
    this.header.setHome(Object.keys(event.router.rawUrlTree.queryParams).length !== 0);
  }
}
