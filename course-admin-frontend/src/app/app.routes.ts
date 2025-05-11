import { Routes } from '@angular/router';

import { AddCourseComponent } from './template/add-course/add-course.component';
import { CourseListComponent } from './template/course-list/course-list.component';
import { AddUserComponent } from './template/add-user/add-user.component';
import { UserListComponent } from './template/user-list/user-list.component';
import { StudentListComponent } from './template/student-list/student-list.component';
import { LoginComponent } from './template/login/login.component';
import { AddCategoryComponent } from './template/add-category/add-category.component';
import { CategoryListComponent } from './template/category-list/category-list.component';
import { AddQuizComponent } from './template/add-quiz/add-quiz.component';
import { QuizListComponent } from './template/quiz-list/quiz-list.component';
import { AddVideoComponent } from './template/add-video/add-video.component';
import { VideoListComponent } from './template/video-list/video-list.component';
import { QuizDetailComponent } from './template/quiz-detail/quiz-detail.component';
import { HomeComponent } from './template/home/home.component';
import { authGuard } from './auth/auth.guard';
import { UnauthorizedComponent } from './template/unauthorized/unauthorized.component';
import { ExamSessionComponent } from './template/exam-session/exam-session.component';

export const routes: Routes = [
  { path: 'unauthorized', component: UnauthorizedComponent },

  {
    path: '',
    component: HomeComponent,
    title: 'Admin - Home',
  },

  {
    path: 'add-course/:id', // 👈 Add this line for editing
    component: AddCourseComponent,
    title: 'Admin - Edit Course',
    canActivate: [authGuard],
    data: { role: 'TEACHER' },
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
    title: 'Admin - Add Course',
    canActivate: [authGuard],
    data: { role: 'TEACHER' },
  },
  {
    path: 'course-list',
    component: CourseListComponent,
    title: 'Admin - Course',
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    title: 'Admin - Add User',
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
  },
  {
    path: 'add-user/:id', // 👈 Add this line for editing
    component: AddUserComponent,
    title: 'Admin - Edit User',
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
  },
  {
    path: 'category-list',
    component: CategoryListComponent,
    title: 'Admin - Category',
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    title: 'Admin - Add Category',
    canActivate: [authGuard],
    data: { role: 'TEACHER' },
  },
  {
    path: 'add-category/:id', // 👈 Add this line for editing
    component: AddCategoryComponent,
    title: 'Admin - Edit Category',
    canActivate: [authGuard],
    data: { role: 'TEACHER' },
  },
  {
    path: 'user-list',
    component: UserListComponent,
    title: 'Admin - Users',
  },
  {
    path: 'student-list',
    component: StudentListComponent,
    title: 'Admin - Students',
  },
  {
    path: 'add-quiz/:id', // 👈 Add this line for editing
    component: AddQuizComponent,
    title: 'Admin - Edit Quiz',
    canActivate: [authGuard],
    data: { role: 'TEACHER' },
  },
  {
    path: 'add-quiz',
    component: AddQuizComponent,
    title: 'Admin - Add Quiz',
    canActivate: [authGuard],
    data: { role: 'TEACHER' },
  },
  {
    path: 'quiz-list',
    component: QuizListComponent,
    title: 'Admin - Quiz',
  },
  {
    path: 'quiz-detail/:id',
    component: QuizDetailComponent,
    title: 'Admin - Quiz Detail',
    canActivate: [authGuard],
    data: { role: 'TEACHER' },
  },

  {
    path: 'add-video/:id', // 👈 Add this line for editing
    component: AddVideoComponent,
    title: 'Admin - Edit Video',
    canActivate: [authGuard],
    data: { role: 'TEACHER' },
  },
  {
    path: 'add-video',
    component: AddVideoComponent,
    title: 'Admin - Add Video',
    canActivate: [authGuard],
    data: { role: 'TEACHER' },
  },
  {
    path: 'video-list',
    component: VideoListComponent,
    title: 'Admin - Videoes',
  },
  {
    path: 'exam-session/:id',
    component: ExamSessionComponent,
    title: 'Admin - Exams',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Admin - Login',
  },
];
