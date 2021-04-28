import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateplanPage } from './createplan.page';

describe('CreateplanPage', () => {
  let component: CreateplanPage;
  let fixture: ComponentFixture<CreateplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateplanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
