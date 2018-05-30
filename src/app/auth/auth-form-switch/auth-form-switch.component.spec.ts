import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormSwitchComponent } from './auth-form-switch.component';

describe('AuthFormSwitchComponent', () => {
  let component: AuthFormSwitchComponent;
  let fixture: ComponentFixture<AuthFormSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthFormSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
