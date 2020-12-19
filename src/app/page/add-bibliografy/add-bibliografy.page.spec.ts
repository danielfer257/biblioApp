import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBibliografyPage } from './add-bibliografy.page';

describe('AddBibliografyPage', () => {
  let component: AddBibliografyPage;
  let fixture: ComponentFixture<AddBibliografyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBibliografyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBibliografyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
