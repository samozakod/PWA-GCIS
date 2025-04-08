import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AssistPage } from './assist.page';

describe('assistPage', () => {
  let component: AssistPage;
  let fixture: ComponentFixture<AssistPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssistPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AssistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
