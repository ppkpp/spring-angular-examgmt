import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { VideoUtils } from '../../utils/video-utils';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { VideoService } from '../../service/video.service';

@Component({
  selector: 'app-video-list',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss',
})
export class VideoListComponent {
  videoCourses: any[] = [];
  isLoading = true;
  isModalOpen: boolean = false;
  videoUrl: string = '';
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  courseId: number | null = null;
  constructor(
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getFormattedDuration(seconds: number): string {
    return VideoUtils.convertSecondsToMinutes(seconds);
  }

  ngOnInit(): void {
      const courseIdParam = this.route.snapshot.paramMap.get('id');
    this.courseId = courseIdParam ? +courseIdParam : null;
    this.fetchVideoes();
  }

  fetchVideoes(): void {
    this.isLoading = true;
    this.videoService
      .getPaginateVideoCourses(
        this.currentPage,
        this.pageSize,
        this.courseId !== null ? this.courseId : undefined
      )
      .subscribe({
        next: (data) => {
          this.videoCourses = data.content;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
          this.isLoading = false;
        },
      });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchVideoes();
  }

  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/files${imagePath}`.replace(
      '.mp4',
      '_thumb.jpg'
    );
  }

  getVideoUrl(imagePath: string): string {
    return `${environment.apiUrl}/files${imagePath}`;
  }

  // Method to open the modal
  openModal(videoUrl: string) {
    this.videoUrl = this.getVideoUrl(videoUrl); ;
    this.isModalOpen = true;
  }

  // Method to close the modal
  closeModal() {
    this.isModalOpen = false;
    this.videoUrl = ''; // Stops video playback
  }
}
