import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {select, arc, pie} from 'd3';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit, AfterViewInit {
  public svg: any;
  public g : any;
  public details: any[] = [{grade: "orange", number: 8},
  {grade: "green", number: 8},
  {grade: "red", number: 18},
  {grade: "blue", number: 20},
  {grade: "yellow", number: 12},
  {grade: "black", number: 30}
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

    let segments = arc().innerRadius(10).outerRadius(130).padAngle(0.05).padRadius(50);

    this.g = this.svg.append("g").attr("transform", "translate(250,250)");
    let sections = this.g.selectAll("path").data(data);
    sections
      .enter()
        .append("path")
    this.render();
    
  }
  
  render(angleOffset : number = 1){
    let data = pie().sort(null).value(function (d:any) {return d.number;})
    .startAngle(angleOffset).endAngle(2 * Math.PI + angleOffset)(this.details);
    let segments = arc()
    .innerRadius(10)
    .outerRadius(130)
    .padAngle(0.05)
    .padRadius(50)
      ;
    let selection = this.g.selectAll("path").data(data);

    selection
    .enter()
      .append("path")
    let paths = this.g.selectAll("path")
    ;

    paths.transition().duration(300)
    .attr("d", segments)
    
    this.g.selectAll("path").attr("fill", (d:any)=>{
      console.log(d);
      return d.data.grade;}
      );

    paths.on("click", (clickEvent: any, selectedItem: any)=>{
      
      this.details = [selectedItem.data,
        ... this.details.filter((item: any) => item.grade !== selectedItem.data.grade)];
      this.render(this.getStartingAngle());
    });
  ;
}

  getStartingAngle(){
    let sizesSum = 0;
    for(let i of this.details){
      sizesSum += i.number;
    }
    let unit = (2 * Math.PI) / sizesSum;
    let offset = Math.PI/2 - (unit * (this.details[0].number/2));
    return offset;
  }

    addActivity(){
      this.details.push({grade: "grey", number: 2});
      this.render()
    }
}


