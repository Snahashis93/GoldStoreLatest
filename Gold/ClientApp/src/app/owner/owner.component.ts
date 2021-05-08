import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../json.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
@Component({
  selector: "app-owner",
  templateUrl: "./owner.component.html",
  styleUrls: ["./owner.component.css"],
})
export class OwnerComponent implements OnInit {
  discount: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  signOut() {
    this.router.navigate(["/"]);
  }
  updateDiscount() {
    const body = {
      discountPercentage: parseInt(this.discount),
    };
    this.userService.updateDiscount(body).subscribe(
      (result: any) => {
        console.log(result);
        this._snackBar.open(
          "Discount Percentage Updated Successfully",
          "close",
          {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          }
        );
      },
      (error) => {
        console.log(error);
        this._snackBar.open(error.error.message, "close", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    );
  }
}
