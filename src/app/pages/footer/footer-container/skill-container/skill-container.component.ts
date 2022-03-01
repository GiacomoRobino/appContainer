import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-skill-container',
  templateUrl: './skill-container.component.html',
  styleUrls: ['./skill-container.component.scss']
})
export class SkillContainerComponent implements OnInit {
  @Input() skill: any;

  constructor() { }

  ngOnInit(): void {
  }

  getSkillSource(): string {
    return "assets/scalableVectorGraphics/skills/" + this.skill + ".svg";
  }

}
