import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-course-item',
  standalone: true, // if using standalone components
  imports: [RouterModule],
  providers: [CurrencyPipe],
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'], // make sure it's "styleUrls"
})
export class CourseItemComponent {
  @Input() course: any;

  constructor(private currencyPipe: CurrencyPipe, private router: Router) {}
  formatMoney(value: number) {
    return this.currencyPipe.transform(value, '', '', '1.0-0'); // e.g., "300,000"
  }

  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/files${imagePath}`;
  }
  goToCourseDetails(courseId: number): void {
   this.router.navigate(['course-detail', courseId]);

  }
}
