import { Component, EventEmitter, Output } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { UploadService } from '../../service/upload.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  @Output() fileUploaded = new EventEmitter<string>();
  progress = 0;
  message = '';
  selectedFile?: File;

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.upload();
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = 'Uploading...';

    this.uploadService.upload(this.selectedFile!).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.message = 'Upload successful!';
          const fileUrl = (event.body as any).webUrl;
          this.fileUploaded.emit(event.body);
        }
      },
      error: (err) => {
        this.progress = 0;
        this.message = 'Upload failed!';
        console.error(err);
      },
    });
  }
}
