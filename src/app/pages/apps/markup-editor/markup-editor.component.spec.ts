import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkupEditorComponent } from './markup-editor.component';

describe('MarkupEditorComponent', () => {
  let component: MarkupEditorComponent;
  let fixture: ComponentFixture<MarkupEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkupEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
