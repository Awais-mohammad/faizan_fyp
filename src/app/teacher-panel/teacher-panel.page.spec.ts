import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherPanelPage } from './teacher-panel.page';

describe('TeacherPanelPage', () => {
  let component: TeacherPanelPage;
  let fixture: ComponentFixture<TeacherPanelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPanelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherPanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
