import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, timeout} from 'd3';
@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit, AfterViewInit{

    constructor() {}
    public simulation: any;
    public node: any;
    public link: any;
    public svg: any;
    public xScale: any;
    public yScale: any;
    public verticalSpacing = 40;
    public xValue: any = (d: any) => d.price;
    public yValue: any = (d: any) => d.name;
  
    public margin: { top: number; right: number; bottom: number; left: number } =
      { top: 20, right: 20, bottom: 20, left: 20 };
    public textsAndNodes: any;
    public width: any;
    public innerWidth: number = 0;
    public circles: any;
    public squareSide: number = 0;
    public data: any;
    public currentCellIndex: number = -1;
  
  
    public words = [""];
    public myText = "";
    
    public timeFrame = 120;
    public sideLength: number = 20;
    public ageLimit = 10;

  
    @ViewChild('matrixSurface') matrixSurface: any;
    
    ngOnInit(): void {
      this.svg = select('.fill-app');
      this.svg.attr('shaper-rendering', 'crispEdges');
    }
    
    ngAfterViewInit() {
      let height = this.matrixSurface.nativeElement.clientHeight;
      this.squareSide = height / this.sideLength;
      this.data = this.setData(this.sideLength);
      this.linkSquares();
      this.mapEachCell(this.randomColorStartingCell.bind(this));
      this.render();
    }

  
    randomColorStartingCell(cell: any) {
      if (Math.random() > 0.999994 && cell.age === 0) {
        return this.getRandomCell(cell);
      } else {
        return cell;
      }
    }

    getRandomCell(cell: any){
      let randomWord = this.words[this.randomNumber(0, this.words.length, true)]
      let startingCount = randomWord.length;
      let result =  {
        ...cell,
        age: startingCount,
        nextAge: startingCount,
        body: {...cell.body, word: randomWord},
      };
      return result;
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
      //console.table(this.data);
      if(this.currentCellIndex >= 0){
        this.populateCell(this.data[this.currentCellIndex]);
      }
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
  
  rectangles.on("mouseover", (hoverEvent: any, selectedItem: any)=>{
    let downIndex = selectedItem.down;
    this.currentCellIndex = downIndex;
    this.populateCell(this.data[downIndex]);
})
  
      en.append('text')
        .merge(groups.select('text'))
        .text((d: any) => (d.body.word && (d.age > 0) ? d.body.word.charAt(d.age - d.body.word.length) : ""))
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

    populateCell(cell : any){
      let cellIndex = this.data[cell.up].down;
      this.data[cellIndex] = this.getRandomCell(this.data[cellIndex]);
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
      onEnter(word:string){
        this.words.push(word)
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
            cell.body.word = cellUp.body.word;
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
  
  
  
  