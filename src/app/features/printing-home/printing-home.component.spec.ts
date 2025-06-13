import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintingHomeComponent } from './printing-home.component';

describe('PrintingHomeComponent', () => {
  let component: PrintingHomeComponent;
  let fixture: ComponentFixture<PrintingHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintingHomeComponent]
    });
    fixture = TestBed.createComponent(PrintingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
