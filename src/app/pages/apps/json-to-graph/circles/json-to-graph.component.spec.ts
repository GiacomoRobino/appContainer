import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonToGraphComponent } from './json-to-graph.component';

describe('JsonToGraphComponent', () => {
  let component: JsonToGraphComponent;
  let fixture: ComponentFixture<JsonToGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonToGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonToGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
