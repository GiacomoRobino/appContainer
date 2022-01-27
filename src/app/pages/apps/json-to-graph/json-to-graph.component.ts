import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { easeBounceInOut, easeCubic, easeCubicIn, easeCubicInOut, easeCubicOut, easeElasticIn, easeQuadInOut, easeSinInOut, select, timeout } from 'd3';

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
  public squareSide: number = 0;
  public data: any;
  public frameCount = 0;

  public sideLength: number = 25;
  public ageLimit = 3;

  ngOnInit(): void {
    this.svg = select('.fill-app');
    this.svg.attr('shaper-rendering', 'crispEdges');
    //TODO: ottenere altezza svg
    this.squareSide = 500 / this.sideLength; //parseInt(h) / this.sideLength;
    this.data = this.setData(
      this.getDefaultOffCell(),
      this.sideLength
    );
    this.linkSquares();
    //this.mapUpCell(this.colorUp);
    //this.mapDownCell(this.colorDown);

    this.mapEachCell(this.randomColorStartingCell.bind(this));
    this.render();
    //this.startAnimation();
  }

  

  startAnimation() {
    this.render();
    window.requestAnimationFrame(this.animationLoop.bind(this));
  }


  animationLoop() {
    this.frameCount += 1;
    
    this.render();
    
    requestAnimationFrame(this.animationLoop.bind(this));
  }


  randomColorStartingCell(cell: any) {
    if (Math.random() > 0.9995 && !cell.isOn) {
      return { ...cell, isOn: true, nextColor: "green", age: this.randomNumber(1, this.ageLimit, true)};
    } else {
      return { ...cell};
    }
  }

  killOldCells(cell: any) {
    if (cell.age > 0) {
      return { ...cell, age: cell.age - 1};
    } else {
      return {...cell, color : "black", isOn: false, age: 0};
    }
  }

  getDefaultOffCell() {
    return {
      text: 'a',
      color: 'black',
      nextColor: 'black',
      letter: 'a',
      up: -1,
      down: -1,
      isOn: false,
      age: 0
    }
  }

  colorUp(cell: any) {
    cell.color = 'yellow';
  }

  colorDown(cell: any) {
    cell.color = "green";
  }
  render() {
    let transitionTime = 100;
    let groups = this.svg.selectAll('g');
    let g = groups.data(this.data);
    let en = g
      .enter()
      .append('g')
      .attr('transform', (d: any, i: number) => this.getTranslateString(i));
    let rectangles = en.append('rect')
      .merge(groups.select('rect'))
      .attr('shape-rendering', 'crispEdges')
      .attr('height', (d: any) => this.squareSide)
      .attr('width', (d: any) => this.squareSide)
    rectangles
      .transition()
      .duration((d :any) => 500 - (d.age ))
      .ease(easeCubicInOut)
      .attr('fill', (d: any) => d.color)
/*
    en.append('text').merge(groups.select('text')).text((d: any) => d.age > 0 ? d.age : '')
        .attr('fill', 'white')
        .attr('fill-opacity', (d: any) => 1.0 - ((1.0/d.age)*3))
        .attr('x', '5px')
        .attr('y', '15px');
*/
    if(this.frameCount % 1 === 0) {
    this.lookUpCell(this.matrixUp);
    this.mapEachCell(this.generateSuccessors);
    this.mapEachCell(this.killOldCells.bind(this));
    this.mapEachCell(this.randomColorStartingCell.bind(this));
    }
    timeout(() => this.render(), 150);
  }

  generateSuccessors(cell: any) {
    return  cell.nextColor === 'green'
    ? { ...cell, color: cell.nextColor, isOn: true }
    : { ...cell, color: 'black' }
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

  colorUpRow(cell: any) {
    if (cell.up >= 0) {
      console.log(cell.up);
      this.data[cell.up].color = 'purple';
    }
  }

  
  matrixUp(cellUp: any, cell: any) {
    if (cellUp.isOn) {
      cell.nextColor = "green";
      cell.age = cellUp.age + 3;
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
