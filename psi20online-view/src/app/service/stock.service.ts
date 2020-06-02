import { HttpClient } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { Stock } from "../model/stock";

@Injectable({
  providedIn: "root",
})
export class StockService {
  private baseUrl = "http://localhost:8080/api/stocks";
  private stokesList: Map<String, Stock> = new Map();

  constructor(private http: HttpClient, private ngZone: NgZone) {}

  /**
   * getStocks: Observable<Stock>  */
  public getStocks(): Observable<Stock[]> {
    return Observable.create((observer) => {
      const eventSource = new EventSource(`${this.baseUrl}`);
      eventSource.onmessage = (event) => {
        const json = JSON.parse(event.data);
        this.stokesList.set(json["name"], {
          id: json["id"],
          name: json["name"],
          currPrice: json["currPrice"],
          v: json["v"],
        });
        // this.stokesList.forEach(e => console.log(e));
        this.ngZone.run(() =>
          observer.next(Array.from(this.stokesList.values()))
        );
      };

      eventSource.onerror = (error) => this.ngZone.run(() => error);

      // return () => eventSource.close();
    });
  }
}
