import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentsPanelPage } from './students-panel.page';

describe('StudentsPanelPage', () => {
  let component: StudentsPanelPage;
  let fixture: ComponentFixture<StudentsPanelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsPanelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentsPanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
