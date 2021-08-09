import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookpurchasePage } from './bookpurchase.page';

describe('BookpurchasePage', () => {
  let component: BookpurchasePage;
  let fixture: ComponentFixture<BookpurchasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookpurchasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookpurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
