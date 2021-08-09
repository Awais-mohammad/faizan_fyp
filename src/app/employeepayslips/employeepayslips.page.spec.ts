import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmployeepayslipsPage } from './employeepayslips.page';

describe('EmployeepayslipsPage', () => {
  let component: EmployeepayslipsPage;
  let fixture: ComponentFixture<EmployeepayslipsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeepayslipsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeepayslipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
