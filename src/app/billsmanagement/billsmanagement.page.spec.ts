import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillsmanagementPage } from './billsmanagement.page';

describe('BillsmanagementPage', () => {
  let component: BillsmanagementPage;
  let fixture: ComponentFixture<BillsmanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsmanagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillsmanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
