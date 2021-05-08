import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { UserService } from "src/app/json.service";
import { EMPTY, Observable, of, throwError } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA, Injectable } from "@angular/core";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OwnerComponent } from "./owner.component";
import { Router } from "@angular/router";
@Injectable()
class MockedClass {
  updateDiscount() {
    const x = {};
    return x;
  }
}
describe("OwnerComponent", () => {
  let component: OwnerComponent;
  let fixture: ComponentFixture<OwnerComponent>;
  let service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerComponent],
      providers: [{ provide: UserService, useClass: MockedClass }],
      imports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule,
        MatSnackBarModule,

        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call updateDiscount() success ", () => {
    const x = {};
    spyOn(service, "updateDiscount").and.returnValue(of(x));
    component.updateDiscount();
    expect(service.updateDiscount).toHaveBeenCalled();
  });
  it("should call updateDiscount() failure ", () => {
    const x = {};
    spyOn(service, "updateDiscount").and.returnValue(
      throwError({ status: 404, error: "nn" })
    );
    component.updateDiscount();
    expect(service.updateDiscount).toHaveBeenCalled();
  });
  it("should call signout", () => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, "navigate");
    component.signOut();
    expect(routerstub.navigate).toHaveBeenCalled();
  });
});
