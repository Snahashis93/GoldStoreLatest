import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailsComponent } from "./details.component";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
describe("DetailsComponent", () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [
        FormsModule,
        BrowserAnimationsModule,

        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatIconModule,
        MatSnackBarModule,
        RouterTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    // spyOnProperty(history.state, 'length', 'get').and.returnValue(1);

    component = fixture.componentInstance;
    component.x = false;

    // let history = {
    //   state: {
    //     isPrivileged: true,
    //   },
    // };
    // Object.defineProperty(window, "history", history);
    fixture.detectChanges();
  });

  it("should create", () => {
    // let x={
    //   isPrivileged: true,
    // }
    // let history = {
    //   state: {
    //     length: true,
    //   },
    // };
    // Object.defineProperty(window, "history", history);
    // const mockNavigator = jasmine.createSpyObj(['x']);
    spyOnProperty(history, "state", "get").and.returnValue({
      isPrivileged: true,
    });
    //spyOnProperty(history.state, 'isPrivileged', 'get').and.returnValue(Object(true));
    //component.x = false;
    component.isDiscountAvailable = true;

    expect(component).toBeTruthy();
  });
  it("should calculate total based on  discount ", () => {
    debugger;
    spyOnProperty(window.history, "state", "get").and.returnValue({
      isPrivileged: true,
    });

    component.isDiscountAvailable = true;
    component.goldPrice = 100;
    component.weight = 5;
    component.discount = 2;
    component.calculate();
    expect(component.totalPrice).toEqual(490);
    //expect(component.isDiscountAvailable).toEqual(true);
  });
  it("should call printToFile ", () => {
    debugger;

    component.isDiscountAvailable = false;
    component.goldPrice = 100;
    component.weight = 2;
    spyOn(component, "calculate");
    component.printToFile();
    expect(component.calculate).toHaveBeenCalled();

    //expect(component.isDiscountAvailable).toEqual(true);
  });
  it("should call printToScreen ", () => {
    debugger;

    component.isDiscountAvailable = false;
    component.goldPrice = 100;
    component.weight = 2;
    spyOn(component, "calculate");
    component.printToScreen();
    expect(component.calculate).toHaveBeenCalled();

    expect(component.isClicked).toEqual(true);
  });
});
