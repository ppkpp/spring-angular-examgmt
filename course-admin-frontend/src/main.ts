// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

  import { bootstrapApplication } from '@angular/platform-browser';
  import { importProvidersFrom } from '@angular/core';
  import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
  import { provideRouter, RouterModule } from '@angular/router';

  import { AppComponent } from './app/app.component';
  import { routes } from './app/app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpInterceptorService } from './app/service/http-interceptor.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

  bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
      importProvidersFrom(
        ToastrModule.forRoot({
          closeButton: true, // ✅ Add this line
          timeOut: 3000, // optional: customize duration
          progressBar: true, // optional: adds a progress bar
        })
      ),
      importProvidersFrom(
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        RouterModule
      ),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorService,
        multi: true,
      },
      provideRouter(routes),
    ],
  });