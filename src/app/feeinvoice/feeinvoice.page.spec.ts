import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeeinvoicePage } from './feeinvoice.page';

describe('FeeinvoicePage', () => {
  let component: FeeinvoicePage;
  let fixture: ComponentFixture<FeeinvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeinvoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeeinvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
