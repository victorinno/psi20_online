import { Component, OnInit } from "@angular/core";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { Stock } from "../model/stock";
import { StockService } from "../service/stock.service";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.css"],
})
export class StockComponent implements OnInit {
  stocks: Observable<Stock[]>;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks() {
    this.stocks = this.stockService.getStocks().pipe(
      map((s) => {
        console.log("--------");
        s.forEach((element) => {
          console.log(element);
        });
        return s;
      })
    );
  }
}
