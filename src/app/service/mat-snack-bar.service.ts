import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class MatSnackBarService {

  constructor(
    public matSnackBar: MatSnackBar,
  ) { }

  public showSuccessSnackBar(message: string): void {
    this.matSnackBar.open(message, 'Success', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-accent','snack-bar']
    });
  }

  public showErrorSnackBar(message: string): void {
    this.matSnackBar.open(message, 'Error', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-warn','snack-bar']
    });
  }
}
