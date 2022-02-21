import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { select } from 'd3';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit , AfterViewInit{
  svg: any;
  ctx : any

  constructor() { }

  ngOnInit() {
    this.svg = select('.background');
    this.svg.attr('shaper-rendering', 'crispEdges');
    Observable.fromEvent(document.body, 'mousemove').subscribe((e : any )=> {
    let barHeight = 1;
    let x0 = e.clientX;
    let y0 = e.clientY;
    this.svg.selectAll('rect').remove();
    this.svg.append('rect')
    .attr('x', 0)
    .attr('y', y0 - barHeight/2)
    .attr('width', 2000)
    .attr('height', barHeight)
    .attr('fill', 'black');
   
    this.svg.append('rect')
    .attr('x', x0 - barHeight/2)
    .attr('y', 0)
    .attr('width',  barHeight)
    .attr('height', 2000)
    .attr('fill', 'black');
    this.setImage(x0, y0);
    });
  }

  ngAfterViewInit() {
  }

  setImage(widthNum :number, heightNum : number) {

    let summer : any = select('.summer');
    let x = summer._groups[0];
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
    imageFall.style.height = (641 - heightNum).toString() + "px";
  }

}
