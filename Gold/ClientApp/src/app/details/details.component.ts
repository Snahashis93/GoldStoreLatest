import { Component, OnInit } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit {
  goldPrice: any;
  weight: any;
  totalPrice: any;
  x: boolean = true;
  discount: any = 2;
  isDiscountAvailable: boolean;
  isClicked: boolean = false;
  message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = "start";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    /* istanbul ignore else*/
    if (this.x && history.state.isPrivileged) {
      this.isDiscountAvailable = history.state.isPrivileged;
    }
  }
  calculate() {
    this.totalPrice = this.goldPrice * this.weight;
    /* istanbul ignore else*/
    if (this.isDiscountAvailable) {
      debugger;
      let discount = (this.totalPrice * this.discount) / 100;
      this.totalPrice -= discount;
    }
  }
  signOut() {
    this.router.navigate(["/"]);
  }
  printToFile() {
    this.calculate();
    window.print();
  }
  printToScreen() {
    this.isClicked = true;

    this.calculate();
    this.message = "Total Price is" + this.totalPrice;
    this._snackBar.open(this.message, "close", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
