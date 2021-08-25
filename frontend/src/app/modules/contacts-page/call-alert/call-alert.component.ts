import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface DialogData {
  username: string;
}

@Component({
  selector: 'app-call-alert',
  templateUrl: './call-alert.component.html',
  styleUrls: ['./call-alert.component.scss'],
})
export class CallAlertComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<CallAlertComponent>
  ) {}

  ngOnInit(): void {}

  accept(): void {
    this.dialogRef.close(true);
  }

  decline(): void {
    this.dialogRef.close(false);
  }
}
