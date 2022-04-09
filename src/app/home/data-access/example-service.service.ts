import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  constructor() {}

  getRelatedValue(value: string) {
    return of(`related value for ${value}`);
  }
}
