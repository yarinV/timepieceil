import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { interval, Observable } from "rxjs";
import { debounce, first } from "rxjs/operators";
import { UpdateTest } from "../../../store/actions/test.actions";
import { selectTest } from "../../../store/selectors/test.selector";
import { Itest } from "../../../store/states/test.state";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.css"]
})
export class TestComponent implements OnInit {
  store;
  test$: Observable<Itest>;
  test;
  // db:AngularFireDatabase;

  constructor(
    store: Store,
    firestore: AngularFirestore,
    private db: AngularFireDatabase
  ) {
    this.store = store;
    this.db = db;
  }
  testForm: FormGroup;
  ngOnInit(): void {
    let database = this.db.object("watches/");
    database.valueChanges().subscribe(res => {
      console.log(res);
    });
    // var starCountRef = database.ref("watches/");
    // starCountRef.on("value", snapshot => {
    //   const data = snapshot.val();
    //   console.log(data);
    // });

    this.testForm = new FormGroup({}, null, null);
    this.testForm.addControl("test", new FormControl());

    this.testForm.statusChanges
      .pipe(debounce(() => interval(300)))
      .subscribe(() => {
        let dataObj = this.testForm.getRawValue();
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
