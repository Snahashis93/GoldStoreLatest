import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
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

@Injectable()
class MockedClass {
  login() {
    const x = { isPrivileged: true };
    return x;
  }
}
describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    //spyOn(service, "login").and.returnValue("");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call login() ", () => {
    const x = { isPrivileged: true };
    spyOn(service, "login").and.returnValue(of(x));
    component.login();
    expect(service.login).toHaveBeenCalled();
  });
  it("should call login() failure ", () => {
    const x = { isPrivileged: true };
    spyOn(service, "login").and.returnValue(
      throwError({ status: 404, error: "nn" })
    );
    component.login();
    expect(service.login).toHaveBeenCalled();
  });
});
