import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';


@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  private dialogComponent!: ConfirmDialogComponent;

  register(dialog: ConfirmDialogComponent) {
    this.dialogComponent = dialog;
  }

  confirm(title: string, message: string): Promise<boolean> {
    return this.dialogComponent.confirm(title, message);
  }
}
