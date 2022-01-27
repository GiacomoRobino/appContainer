import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { select, timeout } from 'd3';

@Component({
  selector: 'app-json-to-graph',
  templateUrl: './json-to-graph.component.html',
  styleUrls: ['./json-to-graph.component.scss'],
})
export class JsonToGraphComponent implements OnInit {
  constructor(private viewContainerRef: ViewContainerRef) {}
  public simulation: any;
  public node: any;
  public link: any;
  public svg: any;
  public xScale: any;
  public yScale: any;
  public verticalSpacing = 20;
  public xValue: any = (d: any) => d.price;
  public yValue: any = (d: any) => d.name;

  public elem = this.viewContainerRef.element.nativeElement;

  public margin: { top: number; right: number; bottom: number; left: number } =
    { top: 20, right: 20, bottom: 20, left: 20 };
  public textsAndNodes: any;
  public width: any;
  public innerWidth: number = 0;
  public circles: any;
  public sideLength: number = 100;
  public squareSide: number = 0;
  public data: any;

  ngOnInit(): void {
    this.svg = select('.fill-app');
    this.svg.attr('shaper-rendering', 'crispEdges');
    //TODO: ottenere altezza svg
    this.squareSide = 500 / this.sideLength; //parseInt(h) / this.sideLength;
    this.data = this.setData(
      {
        text: 'a',
        color: 'black',
        nextColor: 'black',
        letter: 'a',
        up: -1,
        down: -1,
        isOn: false,
      },
      this.sideLength
    );
    this.linkSquares();
    //this.mapUpCell(this.colorUp);
    //this.mapDownCell(this.colorDown);

    this.mapEachCell(this.randomColorStartingCell);

    this.render();
  }
  randomColorStartingCell(cell: any) {
    if (Math.random() > 0.9995 && !cell.isOn) {
      return { ...cell, isOn: true, color: 'green', nextColor: 'green' };
    } else {
      return { ...cell};
    }
  }

  colorUp(cell: any) {
    cell.color = 'yellow';
  }

  colorDown(cell: any) {
    cell.color = 'green';
  }
  render() {
    let groups = this.svg.selectAll('g');
    let g = groups.data(this.data);
    let en = g
      .enter()
      .append('g')
      .attr('transform', (d: any, i: number) => this.getTranslateString(i));
    en.append('rect')
      .merge(groups.select('rect'))
      .attr('shape-rendering', 'crispEdges')
      .attr('height', (d: any) => this.squareSide)
      .attr('width', (d: any) => this.squareSide)
      .transition()
      .duration(40)
      .attr('fill', (d: any) => d.color);
    /*
    en.append('text')
      .merge(groups.select('text'))
      .text((d: any, i: number) => i)
      .attr("fill", "black")
      .attr("y", "20px")
*/
    this.lookUpCell(this.matrixUp);
    this.data = this.data.map((d: any) =>
      d.nextColor === 'green'
        ? { ...d, color: d.nextColor, isOn: true }
        : { ...d, color: 'black' }
    );
    
    this.mapEachCell(this.randomColorStartingCell);
    timeout(() => this.render(), 20);
  }

  setData(record: any, side: number) {
    let data = [];
    for (let i = 0; i < side * side; i++) {
      data.push(record);
    }
    return data;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  randomNumber(min: number, max: number, round: boolean = true) {
    let randomNumber = Math.random() * (max - min) + min;
    return round ? Math.floor(randomNumber) : randomNumber;
  }

  getXY(i: number, a: any) {
    let side = Math.sqrt(a.length);
    let x = i % side;
    let y = Math.floor(i / side);
    return { x: x, y: y };
  }
  getTranslateString(x: number) {
    let result =
      'translate(' +
      this.getXY(x, this.data).x * this.squareSide +
      ',' +
      this.getXY(x, this.data).y * this.squareSide +
      ')';
    return result;
  }

  linkSquares() {
    let downLimit = this.data.length - this.sideLength;
    let upLimit = this.sideLength;
    this.data = this.data.map((d: any, i: number) => {
      let upIndex = i - this.sideLength;
      let downIndex = i + this.sideLength;
      let result = { ...d };
      if (i < downLimit) {
        if (i < upLimit) {
          //assign value to the upper row
          //result.color = "blue";
          result.down = downIndex;
        } else {
          //assign value to the rows different from upper and lower
          //result.color = "green";
          result.up = upIndex;
          result.down = downIndex;
        }
      } else {
        //assign vaue to the lower row
        //result.color = "red";
        result.up = upIndex;
      }
      return result;
    });
  }

  colorDownRow(cell: any) {
    if (cell.down >= 0) {
      this.data[cell.down].color = 'yellow';
    }
  }

  matrixUp(cellUp: any, cell: any) {
    if (cellUp.isOn) {
      cell.nextColor = 'green';
    }
  }

  colorUpRow(cell: any) {
    if (cell.up >= 0) {
      console.log(cell.up);
      this.data[cell.up].color = 'purple';
    }
  }

  lookUpCell(callback: any) {
    this.data
      .filter((cell: any) => cell.up >= 0)
      .forEach((cellUp: any) => callback(this.data[cellUp.up], cellUp));
  }

  mapUpCell(f: any) {
    this.data
      .filter((cell: any) => cell.up >= 0)
      .map((cell: any) => this.data[cell.up])
      .forEach((cellUp: any) => f(cellUp));
  }

  mapDownCell(f: any) {
    this.data
      .filter((cell: any) => cell.down >= 0)
      .map((cell: any) => this.data[cell.down])
      .forEach((cellDown: any) => f(cellDown));
  }

  mapEachCell(f: any) {
    this.data = this.data.map((cell: any) => f(cell));
  }
}
