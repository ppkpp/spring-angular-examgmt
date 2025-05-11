import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideRouter, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { HttpInterceptorService } from './app/service/http-interceptor.service';

bootstrapApplication(AppComponent, {
  providers: [
    
    importProvidersFrom(
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    CommonModule,
    provideRouter(routes),
  ],
});
