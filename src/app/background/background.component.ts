import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  backgroundCanvas: any;
  ctx : any

  constructor() { }

  ngOnInit(): void {
    this.backgroundCanvas = <HTMLCanvasElement>document.querySelector('canvas');
    this.ctx = this.backgroundCanvas.getContext("2d");
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
    this.ctx.fillStyle = "red";
    

    Observable.fromEvent(document.body, 'mousemove').subscribe((e : any )=> {
      this.ctx.fillStyle = "rgb(11, 38, 38)";
      this.ctx.fillRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
      let side = 20;
      
    let x0 = e.clientX;
    let y0 = e.clientY;
    let x1 = x0 + side;
    let y1 = y0 + side;
    this.drawLineY(y0, side);
    this.drawLineY(y0, side,2);
    this.drawLineY(y0, side,4);
    this.drawLineY(y0, side,16);

    this.drawLineX(x0, side);
    this.drawLineX(x0, side,2);
    this.drawLineX(x0, side,4);
    this.drawLineX(x0, side,16);

    })
  }
  drawLineY(y0 : number, side : number, divider: number = 1) {
    this.ctx.fillStyle = "rgb(40, 46, 42)";
    this.ctx.fillRect(0, y0/divider, this.backgroundCanvas.width, side);
    }
  drawLineX(x0 : number, side : number, divider: number = 1) {
    this.ctx.fillStyle = "rgb(40, 46, 42)";
    this.ctx.fillRect(x0/divider, 0, side, this.backgroundCanvas.height);
    }
}
