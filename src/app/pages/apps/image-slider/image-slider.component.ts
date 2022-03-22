import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { select, pointer } from 'd3';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, AfterViewInit {
  @ViewChild("background") bg! : any;
  public svg : any;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.initSvg();
  }

  initSvg() {
    this.svg = select('.app-background');
    this.svg.attr('shaper-rendering', 'crispEdges');

    Observable.fromEvent(document.body, 'mousemove').subscribe((e : any )=> {
    let barHeight = 5;
    let coordinates = this.getMousePos(document.getElementById("app-background"), e);
    this.svg.attr('shaper-rendering', 'crispEdges');
    let x0 = coordinates.x;
    let y0 = coordinates.y;
    
    this.svg.selectAll('rect').remove();
    
    //adding vertical bar
    this.svg.append('rect')
    .attr('x', x0 - barHeight/2)
    .attr('y', 0)
    .attr('width',  barHeight)
    .attr('height', 2000)
    .attr('fill', 'black');
    });
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

}
