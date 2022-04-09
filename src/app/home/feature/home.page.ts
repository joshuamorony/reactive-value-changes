import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { ExampleService } from '../data-access/example-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myForm = this.fb.group({
    fieldOne: [],
    fieldTwo: [],
  });

  fieldOneChanges$ = this.myForm.get('fieldOne').valueChanges.pipe(
    switchMap((val) => this.exampleService.getRelatedValue(val)),
    tap({
      next: (val) => this.myForm.get('fieldTwo').setValue(val),
    })
  );

  constructor(
    private fb: FormBuilder,
    private exampleService: ExampleService
  ) {}
}
