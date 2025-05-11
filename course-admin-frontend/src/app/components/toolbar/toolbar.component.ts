import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService } from '../../service/confirm-dialog.service';
declare var $: any;
@Component({
  selector: 'app-toolbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private confirmService: ConfirmDialogService
  ) {}

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

  ngAfterViewInit(): void {
    // Set full height
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function () {
      $('.js-fullheight').css('height', $(window).height());
    });

    // Sidebar toggle
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
    });
  }
}
