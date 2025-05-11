import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { VideoService } from '../../service/video.service';
import { VideoUtils } from '../../utils/video-utils';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CourseFilterComponent } from '../../components/course-filter/course-filter.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';

@Component({
  selector: 'app-video-list',
  imports: [CommonModule, PaginationComponent, CourseFilterComponent],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss',
})
export class VideoListComponent {
  videoCourses: any[] = [];
  isLoading = true;

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  courseId: number | null = null;
  constructor(
    private videoService: VideoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private confirmService: ConfirmDialogService,
  ) {}

  getFormattedDuration(seconds: number): string {
    return VideoUtils.convertSecondsToMinutes(seconds);
  }

  ngOnInit(): void {
    const courseIdParam = this.route.snapshot.queryParamMap.get('courseId');
    this.courseId = courseIdParam ? +courseIdParam : null;
    this.fetchCourses();
  }

  // fetchCourses(): void {
  //   this.videoService.getVideoCourses().subscribe({
  //     next: (data) => {
  //       this.videoCourses = data;
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching courses:', err);
  //       this.isLoading = false;
  //     },
  //   });
  // }

  fetchCourses(): void {
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
    this.fetchCourses();
  }

  onEdit(courseId: number): void {
    this.router.navigate(['/add-course', courseId]);
  }

  async onDelete(courseId: number) {
      const confirmed = await this.confirmService.confirm(
        'Delete Confirmation',
        'Are you sure you want to delete this course video?'
      );
      if (confirmed) {
        this.videoService.deleteVideoCourse(courseId).subscribe(() => {
          this.videoCourses = this.videoCourses.filter(
            (c) => c.id !== courseId
          );
        });
      }
  }

  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/files${imagePath}`.replace(
      '.mp4',
      '_thumb.jpg'
    );
  }
  viewDetails(course: any) {
    // Navigate or open modal with course details
    console.log('View details:', course);
  }

  editCourse(courseId: number) {
    // Open edit modal or navigate to edit route
    console.log('Edit course:', courseId);
    this.router.navigate(['/add-video', courseId]);
  }

  async deleteCourse(courseId: number) {
   const confirmed = await this.confirmService.confirm(
     'Delete Confirmation',
     'Are you sure you want to delete this course video?'
   );
   if (confirmed) {
     this.videoService.deleteVideoCourse(courseId).subscribe(() => {
       // Create a new array to trigger change detection in Angular
       // this.videoCourses = this.videoCourses.filter((c) => c.id !== courseId);
       this.toastr.success('Video removed.', 'Category!');
       this.fetchCourses();
     });
   }
  }
  isModalOpen: boolean = false;
  videoUrl: string = '';
  getVideoUrl(imagePath: string): string {
    return `${environment.apiUrl}/files${imagePath}`;
  }

  // Method to open the modal
  openModal(videoUrl: string) {
    this.videoUrl = this.getVideoUrl(videoUrl);
    this.isModalOpen = true;
  }

  // Method to close the modal
  closeModal() {
    this.isModalOpen = false;
    this.videoUrl = ''; // Stops video playback
  }

  onCourseSelected(courseId: number) {
    this.courseId = courseId;
    this.currentPage = 0; // Reset to first page on filter change
    this.fetchCourses();
  }

  onAddVideo(): void {
    this.router.navigate(['/add-video']);
  }
}
