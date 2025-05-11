import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @ViewChild('confirmModal', { static: true }) modalElement!: ElementRef;

  title: string = 'Confirm';
  message: string = 'Are you sure?';
  private modal: any;
  private subject = new Subject<boolean>();

  ngAfterViewInit(): void {
    this.modal = new bootstrap.Modal(this.modalElement.nativeElement);
  }

  public confirm(title: string, message: string): Promise<boolean> {
    this.title = title;
    this.message = message;
    this.modal.show();
    return new Promise<boolean>((resolve) => {
      this.subject = new Subject<boolean>();
      this.subject.asObservable().subscribe((result) => resolve(result));
    });
  }

  onYes(): void {
    this.modal.hide();
    this.subject.next(true);
    this.subject.complete();
  }

  onNo(): void {
    this.modal.hide();
    this.subject.next(false);
    this.subject.complete();
  }
}
