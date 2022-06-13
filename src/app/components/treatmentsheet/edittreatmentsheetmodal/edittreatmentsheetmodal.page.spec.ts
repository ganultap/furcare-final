import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { editTreatmentsheetPage } from './edittreatmentsheetmodal.page';

describe('TreatmentsheetPage', () => {
  let component: editTreatmentsheetPage;
  let fixture: ComponentFixture<editTreatmentsheetPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ editTreatmentsheetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(editTreatmentsheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
