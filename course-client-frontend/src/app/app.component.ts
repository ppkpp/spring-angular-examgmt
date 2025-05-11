import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './service/confirm-dialog.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, ToolbarComponent, CommonModule,ConfirmDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'course-client-frontend';
  showSidebarAndToolbar = true;
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;
  constructor(
    private router: Router,
    private confirmService: ConfirmDialogService
  ) {}

  ngOnInit() {
    // Check the route after navigation ends
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Hide sidebar and toolbar if the route is 'login'
        this.showSidebarAndToolbar = event.url !== '/login'; // or check against other login route paths
      });
  }
  ngAfterViewInit() {
    this.confirmService.register(this.confirmDialog);
  }
}