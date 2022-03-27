import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { select } from 'd3';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit , AfterViewInit{
  @ViewChild('bg2') bg2 : any;
  moon = true;
  svg: any;
  ctx : any;
  
  //599 is a magic number TODO: find a better way to do this
  imageHeight = 599;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  setBottomImage(){
    let viewHeight = window.innerHeight;
    console.log(viewHeight - this.imageHeight);
    this.bg2.nativeElement.style.bottom = (viewHeight - this.imageHeight).toString() + "px";
  }

  initCanvas() {
    let canvas = <HTMLCanvasElement>document.querySelector('canvas');
    let ctx : any = canvas.getContext('2d');
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.beginPath();
    ctx.rect(20, 20, 300, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(20, 1200, 300, 1300);
    ctx.stroke();
  }

}
