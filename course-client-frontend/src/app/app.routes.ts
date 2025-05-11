import { Routes } from '@angular/router';
import { HomeComponent } from './template/home/home.component';
import { LoginComponent } from './template/login/login.component';
import { RegisterComponent } from './template/register/register.component';
import { CategoryComponent } from './template/category/category.component';
import { CourseComponent } from './template/course/course.component';
import { QuizComponent } from './template/quiz/quiz.component';
import { ProfileComponent } from './template/profile/profile.component';
import { AboutComponent } from './template/about/about.component';
import { EnrolledCoursesComponent } from './template/profile/enrolled-courses/enrolled-courses.component';
import { EnrolledQuizComponent } from './template/profile/enrolled-quiz/enrolled-quiz.component';
import { DetailComponent } from './template/profile/detail/detail.component';
import { CourseDetailComponent } from './template/course-detail/course-detail.component';
import { EnrollFormComponent } from './template/enroll-form/enroll-form.component';
import { authGuard } from './auth/auth.guard';
import { ForbiddenPageComponent } from './template/forbidden-page/forbidden-page.component';
import { VideoListComponent } from './template/video-list/video-list.component';
import { QuizResultComponent } from './template/quiz-result/quiz-result.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'ELearning - Home',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'ELearning - Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'ELearning - Register',
  },
  {
    path: 'category',
    component: CategoryComponent,
    title: 'ELearning - Category',
  },
  {
    path: 'course',
    component: CourseComponent,
    title: 'ELearning - Courses',
  },
  {
    path: 'course-detail/:id',
    component: CourseDetailComponent,
    title: 'ELearning - Course Detail',
  },

  {
    path: 'enroll-form/:id',
    component: EnrollFormComponent,
    title: 'ELearning - Enroll Form',
    canActivate: [authGuard],
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
    title: 'ELearning - Quizzes',
  },
  {
    path: 'quiz-result/:id',
    component: QuizResultComponent,
    title: 'ELearning - Result',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'ELearning - Profile',
    children: [
      {
        path: 'enrolled-course',
        component: EnrolledCoursesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'enrolled-quiz',
        component: EnrolledQuizComponent,
        canActivate: [authGuard],
      },
      { path: 'detail', component: DetailComponent, canActivate: [authGuard] },
      { path: '', redirectTo: 'enrolled-course', pathMatch: 'full' }, // default child
    ],
    canActivate: [authGuard],
  },
  {
    path: 'video-list/:id',
    component: VideoListComponent,
    title: 'ELearning - Videoes',
    canActivate: [authGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'ELearning - About',
  },
  { path: '403', component: ForbiddenPageComponent },
];

