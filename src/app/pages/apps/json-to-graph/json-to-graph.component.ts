import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { forceSimulation} from 'd3-force'
import { select, selectAll } from 'd3'
@Component({
  selector: 'app-json-to-graph',
  templateUrl: './json-to-graph.component.html',
  styleUrls: ['./json-to-graph.component.scss']
})
export class JsonToGraphComponent implements OnInit {

  constructor(private viewContainerRef:ViewContainerRef) { }
  public svg : any;
  public elem : any;
  ngOnInit(): void {
    this.elem = this.viewContainerRef.element.nativeElement;
      this.svg = select(this.elem).select("svg");
      this.svg.append("rect").attr("height", 30).attr("width", 30).style("fill", "red");
  }

}
