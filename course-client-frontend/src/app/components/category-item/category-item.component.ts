import { Component, ViewEncapsulation, Input } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-category-item',
  imports: [RouterModule],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CategoryItemComponent {
  @Input() category: any;
  constructor(private router: Router) {}

  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/files${imagePath}`;
  }

  getDay(dateStr: string): string {
    return new Date(dateStr).getDate().toString().padStart(2, '0');
  }

  getMonth(dateStr: string): string {
    return new Date(dateStr).toLocaleString('default', { month: 'short' });
  }

  getYear(dateStr: string): string {
    return new Date(dateStr).getFullYear().toString();
  }
  goToCourse(categoryId: number): void {
    this.router.navigate(['/course'], {
      queryParams: { categoryId },
    });
  }
}
