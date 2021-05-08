import { TestBed, async, inject } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard],

      imports: [RouterTestingModule],
    });
    service = TestBed.get(AuthGuard);
  });

  it("should Create", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
  it("should fail and return false", () => {
    localStorage.setItem("isAuthenticated", "N");
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, "navigate");
    let x = service.canActivate(null, null);
    expect(routerstub.navigate).toHaveBeenCalled();
    expect(x).toBeFalsy();
  });
  it("should succeed and return true ", () => {
    localStorage.setItem("isAuthenticated", "Y");

    let x = service.canActivate(null, null);
    expect(x).toBeTruthy();
  });
});
