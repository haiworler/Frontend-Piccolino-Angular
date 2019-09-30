import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataDependencyObservable {

  private subject = new BehaviorSubject<boolean>(false);

  constructor() {}

  public watch = () => this.subject.asObservable();

  public set = (obj: any) => this.subject.next(obj);

  public reset = () => this.subject.next(false);

}
