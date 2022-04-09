import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ExampleService } from '../data-access/example-service.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  myForm = this.fb.group({
    fieldOne: [],
    fieldTwo: [],
  });

  constructor(
    private fb: FormBuilder,
    private exampleService: ExampleService
  ) {}

  ngOnInit() {
    this.myForm
      .get('fieldOne')
      .valueChanges.pipe(
        switchMap((val) => this.exampleService.getRelatedValue(val)),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.myForm.get('fieldTwo').setValue(value);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
