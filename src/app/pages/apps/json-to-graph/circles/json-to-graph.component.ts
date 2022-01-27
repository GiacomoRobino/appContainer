import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
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
  public xValue: any = (d: any) => d.price;
  public yValue: any = (d: any) => d.name;
  public margin: { top: number; right: number; bottom: number; left: number } =
    { top: 20, right: 20, bottom: 20, left: 20 };
  public textsAndNodes: any;
  public width: any;
  public innerWidth: number = 0;
  public circles: any;
  public data: any;

  ngOnInit(): void {
    this.svg = select('.fill-app');
    this.data = [
      { friends: 5, salary: 22, name: "a" },
      { friends: 3, salary: 18, name: "b" },
      { friends: 10, salary: 88, name: "c" },
      { friends: 0, salary: 18, name: "d" },
      { friends: 27, salary: 56, name: "e" },
      { friends: 8, salary: 74, name: "f" }
    ];
    this.circles = this.svg.selectAll('circle');
    this.render();
  }

  render() {
    let groups = this.svg.selectAll('g');
    let g = groups.data(this.data);
    g.exit().remove();
    let en = g
      .enter()
      .append('g')
        .attr('transform', (d:any, i: number) => 'translate('+ i * 100 + ',' + d.friends * 50 + ')');

    groups.merge(en)
        .attr('transform', (d:any, i: number) => 'translate('+ i * 100 + ',' + d.friends * 50 + ')')

    en
      .append("circle")
      .merge(groups.select("circle"))
        .transition().duration(300).attr('r', (d: any) => d.salary);

    this.data = this.genData();

    timeout(()=> this.render(), 1000);
  }

  randomNumber(min: number, max: number, round: boolean = true) {
    let randomNumber = Math.random() * (max - min) + min;
    return round? Math.floor(randomNumber) : randomNumber;
  }

  textValue() {
    return (d: any) => {
      return d.name + ' $' + d.price.toString();
    };
  }
  
  genData(){
    let dataLength = this.randomNumber(2,10);
    let result = Array.from(Array(dataLength).keys()).map(() => ({
      friends:this.randomNumber(1,20),
      salary: this.randomNumber(10,150),
      name: "a",
    })
    );
    return result;
  }
}
  