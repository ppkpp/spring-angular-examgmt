

import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';
@Component({
  selector: 'app-category-list',
  imports: [CommonModule, PaginationComponent, SearchBarComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  isLoading = true;

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  searchTerm: string = '';
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService,
    private confirmService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.isLoading = true;
    this.categoryService
      .getPaginateCategories(this.currentPage, this.pageSize)
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

  onEdit(categoryId: number): void {
    this.router.navigate(['/add-category', categoryId]);
  }

  async onDelete(categoryId: number) {
       const confirmed = await this.confirmService.confirm(
        'Delete Confirmation',
        'Are you sure you want to delete this category?'
      );
    if (confirmed) {
    
      this.categoryService.deleteCategory(categoryId).subscribe(() => {
        //  this.categories = this.categories.filter((c) => c.id !== categoryId);
         this.toastr.success('Category removed.',"Category!");
        this.fetchCategories();
      });
    }
  }

  getImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/files${imagePath}`;
  }

  onAddCategory(): void {
    this.router.navigate(['/add-category']);
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.isLoading = true;
    this.categoryService
      .getPaginateCategoriesWithFilter(
        this.currentPage,
        this.pageSize,
        this.searchTerm
      )
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
  onClear(): void {
    this.fetchCategories();
  }
}
