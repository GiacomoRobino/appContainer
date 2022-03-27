import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { select, selectAll, Selection } from 'd3';
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
    this.addMouseEvents();
  }

  addMouseEvents() {
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
      //setting the background images
      this.setImage(x0);
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


  setImage(x :number) {
    this.setLeftImage("max-width",  x.toString() + "px");
    /*
    leftImage.style.maxWidth = x.toString() + "px";
    let x = leftImage._groups[0];
    let image = x[0];
    image.style.height = heightNum.toString() + "px";

    
    let winter : any = select('.winter');
    let y = winter._groups[0];
    let imageWinter = x[0];
    
    imageWinter.style.width = "50vw";
    imageWinter.style.maxWidth = widthNum.toString() + "px";

    let fall : any = select('.fall');
    let z = fall._groups[0];
    let imageFall = z[0];
    imageFall.style.width = widthNum.toString() + "px";
    imageFall.style.height = (this.imageHeight - heightNum).toString() + "px";
    */

  }

  setLeftImage(style : string, value : string) {
    selectAll('.left-image').style(style,  value);
  }

}
