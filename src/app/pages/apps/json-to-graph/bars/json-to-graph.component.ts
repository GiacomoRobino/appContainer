import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import {
  select,
  descending,
  selectAll,
  forceSimulation,
  SimulationNodeDatum,
  SimulationLinkDatum,
  forceLink,
  forceManyBody,
  forceCenter,
  drag,
  scaleLinear,
  scaleBand,
  max,
  timeout,
} from 'd3';
import { Series } from './dataSeries';

@Component({
  selector: 'app-json-to-graph',
  templateUrl: './json-to-graph.component.html',
  styleUrls: ['./json-to-graph.component.scss'],
})
export class JsonToGraphComponent implements OnInit {
  constructor() {}
  public simulation: any;
  public node: any;
  public link: any;
  public svg: any;
  public xScale: any;
  public yScale: any;
  public verticalSpacing = 20;
  public xValue : any = (d : any) => d.price;
  public yValue : any = (d : any) => d.name;
  public margin : {top:number, right:number, bottom:number, left:number} = {top: 20, right: 20, bottom: 20, left: 20};
  public textsAndNodes: any ;
  public width: any;
  public innerWidth: number = 0;
 

  ngOnInit(): void {
    let s : any = (new Series()).getSeries();
    this.svg = select('.fill-app');
    let widthAsString = this.svg.style("width");
    this.width = parseInt(widthAsString.substring(0, widthAsString.length - 2));
    this.innerWidth = this.width - this.margin.left - this.margin.right;
    this.xScale = scaleLinear().range([0, this.innerWidth]);

    s = [
      [{"name": "Milk", "price": 3},
      {"name": "Egg", "price": 40}],      
      [{"name": "Milk", "price": 3},
      {"name": "Egg", "price": 40},
      {"name": "Meat", "price": 20}],
      [{"name": "Milk", "price": 50},
      {"name": "Egg", "price": 40},
      {"name": "Meat", "price": 20}]

    ]
    s.forEach((element : any, index: number) => {
      timeout(() => this.render(element), index * 3000)
    }
    );
    
  }
  
  render(data : any){
    let xValue = (d : any) => d.price;
    let yValue = (d : any) => d.name;
    data.sort((a : any, b : any) => descending(xValue(a), xValue(b)));
    this.yScale = scaleBand().range([0, this.verticalSpacing * data.length]);
    this.xScale.domain([0, max(data, this.xValue)]);
    this.yScale
      .domain(data.map(this.yValue))
      .range([0, this.verticalSpacing * data.length]);

    let g = this.svg.selectAll('g').data([null]);
    g = g.enter().append('g')
    .merge(g)
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    let groups = g.selectAll('g')
      .data(data, (d:any) => d.name);
    groups.exit().remove();
    let groupsEnter = groups
      .enter().append('g')     
        .attr('transform', (d:any) => 'translate(0,' + this.yScale(this.yValue(d))+')');
    groups
      .merge(groupsEnter)
        .attr('transform', (d:any) => 'translate(0,' + this.yScale(this.yValue(d)) * 1.1+')');
    
    let rects = groupsEnter.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('fill', 'steelblue')
      .merge(groups.select('rect'))
        .attr('height', this.yScale.bandwidth())
      .transition().duration(300)
        .attr('width', (d : any) => {return this.xScale(this.xValue(d)) * 1.1})
        
      .transition().duration(500)
      .attr('width', (d : any) => {return this.xScale(this.xValue(d))})

    let text = groupsEnter.append("text")
        .attr("x", 50)
        .attr("dy", "0.32em")
        .attr("y", this.yScale.bandwidth() / 2)
      .merge(groups.select('text')).text(this.textValue());
  }

  textValue(){
    return (d : any) =>{ return d.name + " $" + d.price.toString()};
  }

}
