import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { UserService } from "./json.service";

describe("RemoteService (fake call with Jasmine)", () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // providers: [{ provide: RemoteService, useValue: jasmineSpy }]
      providers: [UserService],
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
});
