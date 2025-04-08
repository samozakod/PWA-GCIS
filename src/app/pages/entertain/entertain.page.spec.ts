import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { EntertainPage } from './Entertain.page';

describe('EntertainPage', () => {
  let component: EntertainPage;
  let fixture: ComponentFixture<EntertainPage>;

  beforeEach(async () => {

    fixture = TestBed.createComponent(EntertainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
