import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulesComponent } from './articules.component';

describe('ArticulesComponent', () => {
  let component: ArticulesComponent;
  let fixture: ComponentFixture<ArticulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
