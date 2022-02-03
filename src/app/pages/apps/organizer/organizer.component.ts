import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {select, timeout} from 'd3';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit, AfterViewInit {
  public svg: any;
  public xScale: any;
  public yScale: any;
  public verticalSpacing = 40;
  public xValue: any = (d: any) => d.price;
  public yValue: any = (d: any) => d.name;

  
  @ViewChild('matrixSurface') matrixSurface: any;

  constructor() { }

  ngOnInit(): void {
    this.svg = select('.fill-app');
    this.svg.attr('shaper-rendering', 'crispEdges');
    //TODO: ottenere altezza svg
  }
  
  ngAfterViewInit() {
    let height = this.matrixSurface.nativeElement.clientHeight;
  }

}
