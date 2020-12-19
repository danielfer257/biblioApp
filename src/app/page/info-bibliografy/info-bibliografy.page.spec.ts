import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoBibliografyPage } from './info-bibliografy.page';

describe('InfoBibliografyPage', () => {
  let component: InfoBibliografyPage;
  let fixture: ComponentFixture<InfoBibliografyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBibliografyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoBibliografyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
