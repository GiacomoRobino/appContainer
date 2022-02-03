import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { select, arc, pie } from 'd3';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
})
export class OrganizerComponent implements OnInit, AfterViewInit {
  public svg: any;
  public g: any;
  public currentList = 0;
  public circleAttributes = { innerRadius: 70, outerRadius: 130 };
  public details: Array<any[]> = [
    [
      { grade: 'orange', number: 8 },
      { grade: 'green', number: 8 },
      { grade: 'red', number: 18 },
      { grade: 'blue', number: 20 },
      { grade: 'yellow', number: 12 },
      { grade: 'black', number: 30 },
    ],
    [
      { grade: 'green', number: 8 },
      { grade: 'red', number: 18 },
      { grade: 'blue', number: 20 },
    ],
  ];

  @ViewChild('organizerSurface') organizerSurface: any;

  constructor() {}

  ngOnInit(): void {
    this.svg = select('.fill-app');
    this.svg.attr('shaper-rendering', 'crispEdges');
  }

  ngAfterViewInit() {
    let height = this.organizerSurface.nativeElement.clientHeight;
    let width = this.organizerSurface.nativeElement.clientWidth;
    let data = pie()
      .sort(null)
      .value(function (d: any) {
        return d.number;
      })(this.details[this.currentList]);

    let segments = arc()
      .innerRadius(this.circleAttributes.innerRadius)
      .outerRadius(this.circleAttributes.outerRadius)
      .padAngle(0.05)
      .padRadius(50);

    this.g = this.svg.append('g').attr('transform', 'translate(250,250)');
    let sections = this.g.selectAll('path').data(data);
    sections.enter().append('path');
    this.render();
    this.initCentralButtons();
  }

  initCentralButtons(){
    let clickClockWise: any = arc()
    .outerRadius(this.circleAttributes.innerRadius - 5)
    .innerRadius(0)
    .startAngle(-Math.PI / 2.5)
    .endAngle(Math.PI / 1.5);

  this.svg
    .append('path')
    .attr('transform', 'translate(250,250)')
    .attr('d', clickClockWise()).attr("fill", "black")
    .on('click', (clickEvent: any, selectedItem: any) => this.rotateClockWise())
    ;
  
    
  let clickCounterClockWise: any = arc()
  .outerRadius(this.circleAttributes.innerRadius - 5)
  .innerRadius(0)
  .startAngle(Math.PI / 1.5)
  .endAngle( 1.66 * Math.PI);

this.svg
  .append('path')
  .attr('transform', 'translate(250,250)')
  .attr('d', clickCounterClockWise()).attr("fill", "red")
  .on('click', (clickEvent: any, selectedItem: any) => this.rotateCounterClockWise())
  }

  render(angleOffset: number = 1) {
    angleOffset = this.getStartingAngle();
    let data = pie()
      .sort(null)
      .value(function (d: any) {
        return d.number;
      })
      .startAngle(angleOffset)
      .endAngle(2 * Math.PI + angleOffset)(this.details[this.currentList]);
    let segments = arc()
      .innerRadius(this.circleAttributes.innerRadius)
      .outerRadius(this.circleAttributes.outerRadius)
      .padAngle(0.05)
      .padRadius(50);
    let selection = this.g
      .selectAll('path')
      .data(data, (d: any) => d.data.grade);
    selection.exit().remove();

    selection.enter().append('path');
    let paths = this.g.selectAll('path');
    paths.transition().duration(200).attr('d', segments);

    this.g.selectAll('path').attr('fill', (d: any) => {
      return d.data.grade;
    });

    paths.on('click', (clickEvent: any, selectedItem: any) => {
      this.details[this.currentList] = [
        selectedItem.data,
        ...this.details[this.currentList].filter(
          (item: any) => item.grade !== selectedItem.data.grade
        ),
      ];
      this.render();
    });
  }

  getStartingAngle() {
    let sizesSum = 0;
    for (let i of this.details[this.currentList]) {
      sizesSum += i.number;
    }
    let unit = (2 * Math.PI) / sizesSum;
    let offset =
      Math.PI / 2 - unit * (this.details[this.currentList][0].number / 2);
    return offset;
  }

  addActivity() {
    this.details[this.currentList].push({ grade: 'grey', number: 2 });
    this.render();
  }

  changeCurrentList() {
    this.currentList === 0 ? (this.currentList = 1) : (this.currentList = 0);
    this.render();
  }

  rotateCounterClockWise() {
    let middleArray = [...this.details[this.currentList]];
    middleArray.shift();
    let shiftedArray = [...middleArray, this.details[this.currentList][0]];
    middleArray.shift();
    middleArray.pop();
    this.details[this.currentList] = shiftedArray;
    this.render();
  }

  rotateClockWise() {
    let middleArray = [...this.details[this.currentList]];
    let popped = middleArray.pop();
    let shiftedArray = [popped, ...middleArray];
    this.details[this.currentList] = shiftedArray;
    this.render();
  }
}
