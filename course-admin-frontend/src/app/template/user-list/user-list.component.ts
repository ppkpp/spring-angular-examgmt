import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../components/pagination/pagination.component';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,PaginationComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: any[] = []; // To store the list of users
  isLoading: boolean = true; // To show loading spinner

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  // fetchUsers(): void {
  //   this.userService.getUsers().subscribe({
  //     next: (data) => {
  //       this.users = data; // Store the fetched data
  //       this.isLoading = false; // Hide loading spinner
  //     },
  //     error: (err) => {
  //       console.error('Error fetching users:', err);
  //       this.isLoading = false;
  //     },
  //   });
  // }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService
      .getPaginateUsers(this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.users = data.content;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          this.isLoading = false;
        },
      });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchUsers();
  }

  onEdit(userId: number) {
    console.log('Edit user', userId);
    this.router.navigate(['/add-user', userId]);
    // Navigate to edit page or open modal with user info
  }

  onDelete(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
      //  this.users = this.users.filter((u) => u.id !== userId);
         this.fetchUsers();
      });
    }
  }
}