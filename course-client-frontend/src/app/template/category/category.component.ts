import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ApiService } from '../../service/api.service';
import { CategoryItemComponent } from '../../components/category-item/category-item.component';

@Component({
  selector: 'app-category',
  imports: [CommonModule, PaginationComponent, CategoryItemComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  isLoading = true;

  currentPage = 0;
  pageSize = 6;
  totalPages = 0;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.isLoading = true;
    this.apiService
      .getPaginated('categories', this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.categories = data.content;
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
    this.fetchCategories();
  }

 
}
