import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { switchMap, takeUntil } from 'rxjs/operators';
import { HomeStore } from '../data-access/home.store';
import { ExampleService } from '../data-access/example-service.service';

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
    this.myForm
      .get('fieldOne')
      .valueChanges.pipe(
        switchMap((val) => this.exampleService.getRelatedValue(val)),
        takeUntil(this.homeStore.destroy$)
      )
      .subscribe((value) => {
        this.myForm.get('fieldTwo').setValue(value);
      });
  }
}
