import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalleriesPage } from './salleries.page';

describe('SalleriesPage', () => {
  let component: SalleriesPage;
  let fixture: ComponentFixture<SalleriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalleriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalleriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
