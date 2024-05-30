import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LessonPageComponent } from './lesson-page/lesson-page.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LessonTextComponent } from './lesson-text/lesson-text.component';
import { LessonQuizComponent } from './lesson-quiz/lesson-quiz.component';

/*
export const routes: Routes = [
    {path: 'home', title: 'Home', component: HomePageComponent},
    {path: 'lessons', title: 'Lessons', component: LessonsComponent},
    {path: 'lessons', children:[
        {path: ':lessonId', component: LessonPageComponent}
    ]},    
    {path: 'contact', title: 'Contact', component: ContactComponent},
    {path: 'about', title: 'About', component: AboutComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
*/


export const routes: Routes = [
    { path: 'home', title: 'GrafoSofos', component: HomePageComponent },
    { path: 'lessons', title: 'Lessons', component: LessonsComponent },
    {
        path: 'lessons', children: [
            { path: ':lessonId', component: LessonPageComponent },
            {
                path: ':lessonId/quiz', component: LessonTextComponent // Add this line for quiz routing
            }
        ]
    },
    { path: 'contact', title: 'Contact', component: ContactComponent },
    { path: 'about', title: 'About', component: AboutComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
