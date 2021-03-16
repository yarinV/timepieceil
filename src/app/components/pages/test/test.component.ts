import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { interval, Observable } from "rxjs";
import { debounce, first } from "rxjs/operators";
import { UpdateTest } from "../../../store/actions/test.actions";
import { selectTest } from "../../../store/selectors/test.selector";
import { Itest } from "../../../store/states/test.state";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  store;
  test$: Observable<Itest>;
  test;

  constructor(store: Store) {
    this.store = store;
  }
  testForm: FormGroup;
  ngOnInit(): void {
    this.testForm = new FormGroup({}, null, null);
    this.testForm.addControl("test", new FormControl());

    this.testForm.statusChanges
      .pipe(debounce(() => interval(300)))
      .subscribe(() => {
        let dataObj = this.testForm.getRawValue();
        console.log(dataObj);

        this.store.dispatch(UpdateTest({ test: dataObj.test }));
      });

    this.test$ = this.store.select(selectTest);
    this.test$.subscribe(data => {
      this.test = data;
    });

    this.test$.pipe(first()).subscribe((data: Itest) => {
      this.testForm.patchValue({ test: data.test });
    });
  }
}
