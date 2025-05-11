import { Component, EventEmitter, Output } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.scss'],
  imports: [AutocompleteLibModule],
})
export class CourseFilterComponent {
  data: Array<any> = [];
  keyword = 'title';

  @Output() courseSelected = new EventEmitter<number>();

  constructor(private courseService: CourseService) {}

  onChangeSearch(val: string) {
    if (val && val.length > 1) {
      this.courseService.searchCoursesByName(val).subscribe(
        (res: any[]) => {
          this.data = res;
        },
        (err) => {
          console.error('Search error:', err);
        }
      );
    }
  }

  selectEvent(item: any) {
    if (item?.id) {
      this.courseSelected.emit(item.id);
    }
  }

  onFocused(e: any) {}
}
