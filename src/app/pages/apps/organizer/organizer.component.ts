import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {select, arc, pie, timeout} from 'd3';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit, AfterViewInit {
  public svg: any;
  public g : any;
  public details: any[] = [{grade: "A+", number: 8},
  {grade: "B", number: 8},
  {grade: "C", number: 18},
  {grade: "D", number: 20},
  {grade: "E", number: 12},
  {grade: "F", number: 30}
]
  
  @ViewChild('organizerSurface') organizerSurface: any;

  constructor() { }

  ngOnInit(): void {
    this.svg = select('.fill-app');
    this.svg.attr('shaper-rendering', 'crispEdges');
    //TODO: ottenere altezza svg
  }
  
  ngAfterViewInit() {
    let height = this.organizerSurface.nativeElement.clientHeight;
    let width = this.organizerSurface.nativeElement.clientWidth;
    let data = pie().sort(null).value(function (d:any) {return d.number;})(this.details);
    let segments = arc().innerRadius(100).outerRadius(130).padAngle(0.05).padRadius(50);

    this.g = this.svg.append("g").attr("transform", "translate(250,250)");
    let sections = this.g.selectAll("path").data(data);
    sections
      .enter()
        .append("path")
    this.render();
    
  }
  
  render(){
    let data = pie().sort(null).value(function (d:any) {return d.number;})(this.details);
    let segments = arc().innerRadius(100).outerRadius(130).padAngle(0.05).padRadius(50);

    let selection = this.g.selectAll("path").data(data);
    selection
    .enter()
      .append("path")


      this.g.selectAll("path").transition().duration(300)
    .attr("d", segments);
    
    
    }
    addActivity(){
      this.details.push({grade: "xxx", number: 2});
      this.render()
    }
}


