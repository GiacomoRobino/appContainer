import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import {
  easeBounceInOut,
  easeCubic,
  easeCubicIn,
  easeCubicInOut,
  easeCubicOut,
  easeElasticIn,
  easeQuadInOut,
  easeSinInOut,
  select,
  timeout,
} from 'd3';

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
  public verticalSpacing = 40;
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
  
  public timeFrame = 120;
  public sideLength: number = 25;
  public ageLimit = 10;

  ngOnInit(): void {
    this.svg = select('.fill-app');
    this.svg.attr('shaper-rendering', 'crispEdges');
    //TODO: ottenere altezza svg
    this.squareSide = 500 / this.sideLength; //parseInt(h) / this.sideLength;
    this.data = this.setData(this.sideLength);
    this.linkSquares();
    this.mapEachCell(this.randomColorStartingCell.bind(this));
    this.render();
  }


  randomColorStartingCell(cell: any) {
    if (Math.random() > 0.9994 && cell.age === 0) {
      let randomNumber = this.randomNumber(1, this.ageLimit, true)
      return {
        ...cell,
        age: randomNumber,
        nextAge: randomNumber,
      };
    } else {
      return cell;
    }
  }

  getDefaultOffCell() {
    return {
      body: {color: "black"},
      up: -1,
      down: -1,
      age: 0,
      nextAge:0,
      operations: []
    };
  }

  render() {
    let groups = this.svg.selectAll('g');
    let g = groups.data(this.data);
    let en = g
      .enter()
      .append('g')
      .attr('transform', (d: any, i: number) => this.getTranslateString(i));

    let rectangles = en
      .append('rect')
      .merge(groups.select('rect'))
      .attr('shape-rendering', 'crispEdges')
      .attr('height', (d: any) => this.squareSide)
      .attr('width', (d: any) => this.squareSide);

    
      rectangles.attr('style', (d: any) => d.body.color);
      rectangles.on("click", (clickEvent: any, selectedItem: any)=>{
      this.multOnSelect(selectedItem);
});

    en.append('text')
      .merge(groups.select('text'))
      //.filter((d: any) => (d.age > 0 || d.nextAge > 0))
      .text((d: any) => (d.age))
      .attr('fill', (d: any) =>  d.body.color)
      //.attr('fill-opacity', (d: any) => 1.0 - (1.0 / d.age) * 3)
      .attr('fill-opacity', (d: any) => (3.0 / Math.abs(this.ageLimit - d.age)))
      .attr('font-size', '8px')
      .attr('y', "10px")
      .attr('x', "7px")
      ;
      
      this.mapEachCell(this.randomColorStartingCell.bind(this));

      this.populateCells();

    
    timeout(() => this.render(), this.timeFrame);
  }

  populateCells() {
    //update all cells
    this.lookUpCell(this.updateNextAges.bind(this));
    this.mapEachCell(this.updateAges.bind(this));
  }
  

    
    
    setData(side: number) {
      let data = [];
      for (let i = 0; i < side * side; i++) {
        data.push(this.getDefaultOffCell());
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
            result.down = downIndex;
          } else {
            result.up = upIndex;
            result.down = downIndex;
          }
        } else {
          result.up = upIndex;
        }
        return result;
      });
    }

    multOnSelect(selectedItem: any) {
      selectedItem.operations.push = (x: any) => x * 3;
      selectedItem.body.color = "red";
    }
    
    updateNextAges(cellUp: any, cell: any) {
      if (cell.age > 0) {
        cell.body.color = "green";
        cell.nextAge -= 1;
        if(cell.nextAge <= 0) {
          
          cell.body.color = "black";
          cell.age = 0;
        }
      }
      
      else if (cellUp){
      if(cellUp.age > 0) {
        cell.body.color = "white";
        cell.nextAge = cellUp.age + 1;
      }
    }
    }
    
    updateAges(cell: any) {
      if (cell.age === 0) {
      cell.age = cell.nextAge;
      }
      return cell;
    }
  

  lookUpCell(callback: any) {
    this.data
      .forEach((cell: any) => callback(this.data[cell.up], cell));
  }

  lookDownCell(callback: any) {
    this.data
      .filter((cell: any) => cell.down >= 0)
      .forEach((cellDown: any) => callback(this.data[cellDown.down], cellDown));
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



