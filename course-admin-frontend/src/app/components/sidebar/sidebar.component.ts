import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private confirmService:ConfirmDialogService) {}

  async confirmLogout() {
    const confirmed = await this.confirmService.confirm(
      'Logout Confirmation',
      'Are you sure you want to logout?'
    );

    if (confirmed) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
