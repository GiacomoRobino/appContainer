import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { select, pointer } from 'd3';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {
  @ViewChild("background") bg! : any;
  public svg : any;

  constructor() { }

  ngOnInit(): void {
    this.initSvg();
  }

  initSvg() {
    this.svg = select('.background');
    this.svg.attr('shaper-rendering', 'crispEdges');

    Observable.fromEvent(document.body, 'mousemove').subscribe((e : any )=> {
    let barHeight = 20;

    let coordinates = this.getMousePos(document.getElementById("background"), e);
    let x0 = coordinates.x;
    let y0 = coordinates.y;
    console.log(x0, y0);
    
    this.svg.selectAll('rect').remove();
    this.svg.append('rect')
    .attr('x', 0)
    .attr('y', y0 - barHeight/2)
    .attr('width', x0)
    .attr('height', barHeight)
    .attr('fill', 'black');
   
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
