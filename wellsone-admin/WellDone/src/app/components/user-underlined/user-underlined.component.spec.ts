import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUnderlinedComponent } from './user-underlined.component';

describe('UserUnderlinedComponent', () => {
  let component: UserUnderlinedComponent;
  let fixture: ComponentFixture<UserUnderlinedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUnderlinedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUnderlinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
