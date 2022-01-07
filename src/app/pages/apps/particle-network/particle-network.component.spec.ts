import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleNetworkComponent } from './particle-network.component';

describe('ParticleNetworkComponent', () => {
  let component: ParticleNetworkComponent;
  let fixture: ComponentFixture<ParticleNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticleNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticleNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
