import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PanelHomePage } from './panel-home.page';

describe('PanelHomePage', () => {
  let component: PanelHomePage;
  let fixture: ComponentFixture<PanelHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
