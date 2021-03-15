import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { interval, Observable } from 'rxjs';
import { debounce, first } from 'rxjs/operators';
import { FeatureManagerService } from 'src/app/services/feature-manager.service';
import { UpdateTest } from 'src/app/store/actions/test.actions';
import { selectTest } from 'src/app/store/selectors/test.selector';
import { Itest } from 'src/app/store/states/test.state';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  store;
  test$: Observable<Itest>;
  test;
  featureManagerService;

  constructor(store: Store, featureManagerService: FeatureManagerService) {
    this.store = store;
    this.featureManagerService = featureManagerService;
  }
  testForm: FormGroup;
  ngOnInit(): void {
    this.featureManagerService.init();
    this.testForm = new FormGroup({}, null, null);
    this.testForm.addControl( "test", new FormControl() );

    this.testForm.statusChanges.pipe(debounce(() => interval(300))).subscribe(() => {
      let dataObj = this.testForm.getRawValue();
      console.log(dataObj);

      this.store.dispatch( UpdateTest({ test: dataObj.test }) );
    });

    this.test$ = this.store.select(selectTest);
    this.test$.subscribe((data) => {
			this.test = data;
		});

    this.test$.pipe(first()).subscribe((data: Itest) => {
      this.testForm.patchValue({ "test": data.test });
		});
  }


}
