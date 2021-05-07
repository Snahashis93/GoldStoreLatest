import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationExtras } from "@angular/router";
import { UserService } from "src/app/json.service";
import { from } from "rxjs";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  userName: string;
  passWord: string;
  errorMessage: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  hide: boolean = true;
  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  login() {
    const body = {
      username: this.userName,
      password: this.passWord,
    };
    this.userService.login(body).subscribe(
      (result: any) => {
        debugger;
        console.log(result);
        let navigationExtras: NavigationExtras = {
          state: {
            isPrivileged: result.isPrivileged,
          },
        };
        this.router.navigate(["/details"], navigationExtras);
      },
      (error) => {
        this.errorMessage = error.error.message;
        this._snackBar.open(this.errorMessage, "close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });

        console.error(error.error);
      }
    );
  }
}
