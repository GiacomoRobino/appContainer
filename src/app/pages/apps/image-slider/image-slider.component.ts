import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { select, selectAll, Selection } from 'd3';
import { Observable } from 'rxjs';
import { CssConversion } from './CssConversion';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, AfterViewInit {
  @ViewChild("background") bg! : any;
  public svg : any;
  public converter = new CssConversion();
  public barHeight = 5;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.initSvg();
    this.setBlackBars(
      this.getImageWidthAsInt() / 2,
      this.getImageHeightAsInt() /2
    );
  }

  initSvg() {
    this.svg = select('.app-background');
    this.svg.attr('shaper-rendering', 'crispEdges');
    this.addMouseEvents();
  }

  addMouseEvents() {
    Observable.fromEvent(document.body, 'mousemove').subscribe((e : any )=> {
      let coordinates = this.getMousePos(document.getElementById("app-background"), e);
      this.svg.attr('shaper-rendering', 'crispEdges');
      let x0 = coordinates.x;
      let y0 = coordinates.y;
      this.setBlackBars(x0, y0);
      });
  }

  setBlackBars(x0: number, y0: number) {
    this.svg.selectAll('rect').remove();
      
      //adding vertical bar
      this.svg.append('rect')
      .attr('x', x0 - this.barHeight/2)
      .attr('y', 0)
      .attr('width',  this.barHeight)
      .attr('height', this.getImageHeight())
      .attr('fill', 'black');
      
      //adding horizontal bar
      this.svg.append('rect')
      .attr('x', 0)
      .attr('y', y0 - this.barHeight/2)
      .attr('width', this.getImageWidth())
      .attr('height',this.barHeight)
      .attr('fill', 'black');

      //setting the background images
      this.setDivision(x0, y0);
      }

  getMousePos(element: any, event: any) {
    
    let x0 = event.clientX;
    let y0 = event.clientY;
    var rect = element.getBoundingClientRect();
    return {
      x: x0 - rect.left,
      y: y0 - rect.top
    };
}


  setDivision(x: number, y: number) {
    let xInPx = this.converter.intToPx(x);
    let yInPx = this.converter.intToPx(y);
    this.setImage("left", "max-width", xInPx);
    this.setImage("left", "max-height",  yInPx);
    this.setImage("right", "max-height",  yInPx);
    this.setImage("bottom", "max-width", xInPx);
  }

  setImage(selector: string, style : string, value : string) {
    selectAll("." + selector + "-image").style(style,  value);
  }

  getImageWidth(): string {
    return  (document.getElementsByClassName('top-image')[0] as HTMLElement).offsetWidth.toString();
  }

  getImageHeight(): string {
    return  (document.getElementsByClassName('top-image')[0] as HTMLElement).offsetHeight.toString();
  }

  getImageWidthAsInt(): number {
    return  (document.getElementsByClassName('top-image')[0] as HTMLElement).offsetWidth;
  }

  getImageHeightAsInt(): number {
    return  (document.getElementsByClassName('top-image')[0] as HTMLElement).offsetHeight;
  }
}
