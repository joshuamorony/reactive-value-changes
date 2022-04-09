import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { HomeStore } from '../data-access/home.store';
import { ExampleService } from '../data-access/example-service.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [HomeStore],
})
export class HomePage implements OnInit {
  myForm = this.fb.group({
    fieldOne: [],
    fieldTwo: [],
  });

  constructor(
    private fb: FormBuilder,
    private homeStore: HomeStore,
    private exampleService: ExampleService
  ) {}

  ngOnInit() {
    this.homeStore.fieldOneValueChangesEffect(
      this.myForm.get('fieldOne').valueChanges.pipe(
        // Get a related value from some API
        switchMap((val) => this.exampleService.getRelatedValue(val)),
        // Set that value
        tap({
          next: (value) => this.myForm.get('fieldTwo').setValue(value),
        })
      )
    );

    // const obs1$ = timer(1000, 1000).pipe(
    //   tap({
    //     next: (value) => this.myForm.get('fieldTwo').setValue(value),
    //   })
    // );
    // const obs2$ = timer(1000, 1300).pipe(
    //   tap({
    //     next: (value) => this.myForm.get('fieldTwo').setValue(value),
    //   })
    // );
    // const obs3$ = timer(1000, 1800).pipe(
    //   tap({
    //     next: (value) => this.myForm.get('fieldTwo').setValue(value),
    //   })
    // );
    // this.homeStore.subscribeTo(obs1$);
    // this.homeStore.subscribeTo(obs2$);
    // this.homeStore.subscribeTo(obs3$);
  }
}
