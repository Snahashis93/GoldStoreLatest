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
import { UserService } from "src/app/json.service";
import { of, throwError } from "rxjs";
import { Router } from "@angular/router";

class MockedClass {
  getDiscount() {
    const x = { discountPercentage: 6 };
    return of(x);
  }
}
describe("DetailsComponent", () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [{ provide: UserService, useClass: MockedClass }],

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
    service = TestBed.get(UserService);

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
    const x = { discountPercentage: 6 };
    spyOn(service, "getDiscount").and.returnValue(of(x));
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
  it("should call getDiscount success ", () => {
    const x = { discountPercentage: 8 };
    spyOn(service, "getDiscount").and.returnValue(of(x));
    component.ngOnInit();
    expect(service.getDiscount).toHaveBeenCalled();
    expect(component.discount).toEqual(8);
  });
  it("should call getDiscount failure", () => {
    const x = { discountPercentage: 8 };
    spyOn(service, "getDiscount").and.returnValue(
      throwError({ status: 404, error: "nn" })
    );
    component.ngOnInit();
    expect(service.getDiscount).toHaveBeenCalled();
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
  it("should call signout", () => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, "navigate");
    component.signOut();
    expect(routerstub.navigate).toHaveBeenCalled();
  });
});
