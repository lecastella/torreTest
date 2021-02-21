import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSource = new BehaviorSubject<any>({});
  data = this.dataSource.asObservable();
   
  constructor() { }

  updatedDataSelection(data: any){
    this.dataSource.next(data);
  }
}
