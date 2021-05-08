import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { UserService } from "./json.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // providers: [{ provide: RemoteService, useValue: jasmineSpy }]
    });

    // inject the service
    service = TestBed.get(UserService);
  });

  it("should have a service instance", () => {
    expect(service).toBeDefined();
  });

  it("should return the mocked data in the subscribe", () => {
    const spy = spyOn(service, "login").and.returnValue(
      of({
        isPrivileged: true,
      })
    );
    const body = { username: "Privileged", password: "test" };
    // act
    service.login(body).subscribe((data: any) => {
      expect(data.isPrivileged).toBe(true);
    });

    // assert
    expect(spy).toHaveBeenCalled();
  });
  it("should return the mocked data in the subscribe", () => {
    const spy = spyOn(service, "updateDiscount").and.returnValue(of({}));
    const body = { discountPercentage: 6 };

    // act
    service.updateDiscount(body).subscribe((data: any) => {
      // expect(data.discountPercentage).toBe(true);
    });

    // assert
    expect(spy).toHaveBeenCalled();
  });
  it("should return the mocked data in the subscribe", () => {
    const spy = spyOn(service, "getDiscount").and.returnValue(
      of({ discountPercentage: 6 })
    );
    const body = { discountPercentage: 6 };
    // act
    service.getDiscount().subscribe((data: any) => {
      expect(data.discountPercentage).toBe(6);
    });

    // assert
    expect(spy).toHaveBeenCalled();
  });
});
