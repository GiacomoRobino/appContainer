import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { select, selectAll, forceSimulation, SimulationNodeDatum, SimulationLinkDatum, forceLink,
forceManyBody,forceCenter, drag} from 'd3';
import {Node} from './node';

@Component({
  selector: 'app-json-to-graph',
  templateUrl: './json-to-graph.component.html',
  styleUrls: ['./json-to-graph.component.scss']
})

export class JsonToGraphComponent implements OnInit {
  
  constructor(private viewContainerRef:ViewContainerRef) { }
  public simulation: any;
  public node: any;
  public link: any;
  public svg : any;
  public elem = this.viewContainerRef.element.nativeElement;
  public graph : {nodes: SimulationNodeDatum[], links: SimulationLinkDatum<SimulationNodeDatum>[]} = {
    nodes: [
      new Node("Alice"),
      new Node("Bob" ),
      new Node("Chen"),
      new Node("Dawg")
    ],
    links: [
      { source: "Alice", target: "Bob" },
      { source: "Chen", target: "Bob" }
    ]
  };


  ngOnInit(): void {
      this.svg = this.localSelector("#svgID");
      let width = this.svg.attr("width");
      let height = this.svg.attr("height");
      this.simulation = forceSimulation(this.graph.nodes)
      let x = this.ticked.bind(this);
    this.simulation.force(
      "link",
      forceLink()
        .id(function(d:any) {
          return d.name;
        })
        .links(this.graph.links)
    )

    .force("charge", forceManyBody().strength(-0))
    .force("center", forceCenter(width / 2, height / 2))
    .on("tick", x);

    this.link = this.svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(this.graph.links)
    .enter()
    .append("line")
    .attr("stroke-width", 3).attr("color", "blue");

    this.node = this.svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(this.graph.nodes)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill", function(d: any) {
      return "red";
    })
    .call(
      drag()
        .on("start", this.dragstarted.bind(this))
        .on("drag", this.dragged)
        .on("end", this.dragended.bind(this))
    );
    }

   ticked() {
    this.link
      .attr("x1", function(d:any) {
        return d.source.x;
      })
      .attr("y1", function(d:any) {
        return d.source.y;
      })
      .attr("x2", function(d:any) {
        return d.target.x;
      })
      .attr("y2", function(d:any) {
        return d.target.y;
      });

    this.node
      .attr("cx", function(d:any) {
        return d.x;
      })
      .attr("cy", function(d:any) {
        return d.y;
      });
  }

  dragstarted(d : any) {
    console.log(d);
    if (!d.active) this.simulation.alphaTarget(0.3).restart();
    d.subject.fx = d.x;
    d.subject.fy = d.y;
  }

   dragged(d:any) {
    d.subject.fx = d.x;
    d.subject.fy = d.y;
  }

   dragended(d:any) {
   if (!d.active) this.simulation.alphaTarget(0);
    d.subject.fx = null;
    d.subject.fy = null;
  }

  localSelector(selector:string) {
    return select(this.elem).select(selector);
  }

  fill(l : any) {
    let divs = this.svg.selectAll("div").data(l);
    divs.enter().append("div").merge(divs).text((d : string)=> d);
    divs.exit().remove();
  }

}
