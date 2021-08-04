import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  private _withDivider = false;
  @Input()
  get withDivider(): any {
    return this._withDivider;
  }
  set withDivider(value: any) {
    this._withDivider = coerceBooleanProperty(value);
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

  public isMdAndUp!: Observable<boolean>;

  ngOnInit(): void {
    this.isMdAndUp = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => !result.matches));
  }
}
