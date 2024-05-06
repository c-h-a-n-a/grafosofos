import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsComponent } from '../lessons/lessons.component';
import { ActivatedRoute, Params } from '@angular/router';
import { LeftNavBarHoverComponent } from '../left-nav-bar-hover/left-nav-bar-hover.component';
import { Title } from '@angular/platform-browser';
import { Lesson1Component } from '../lesson1/lesson1.component';
import { Lesson2Component } from '../lesson2/lesson2.component';
import { Lesson3Component } from '../lesson3/lesson3.component';
import { Lesson4Component } from '../lesson4/lesson4.component';

@Component({
  selector: 'app-lesson-page',
  standalone: true,
  imports: [LeftNavBarHoverComponent, CommonModule, LessonsComponent, Lesson1Component, 
    Lesson2Component, Lesson3Component, Lesson4Component
  ],
  templateUrl: './lesson-page.component.html',
  styleUrl: './lesson-page.component.css'
})
export class LessonPageComponent implements OnInit{

  selectedContent: string = 'Default';

  handleContentSelection(content: string) {
    console.log('Selected Content:', content);
    this.selectedContent = content;
  }

 // selectedLesson: string = '';

 // isLesson2Selected: boolean = false;
/*
  handleLessonSelection(lessonContent: string) {
    console.log('Selected lesson: ', lessonContent);
    this.selectedLesson = lessonContent;
    //this.selectedLesson = lessonContent;
  }
*/

selectedLesson!: string;

  constructor(private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const lessonId = params['lessonId'];
      const pageTitle = `Lesson | ${lessonId}`;
      this.titleService.setTitle(pageTitle);
      this.selectedLesson = lessonId;
    });
  }
/*
  handleSectionSelected(section: string) {
    const targetSection = document.getElementById(section);
    console.log('value of section: ',section);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  */

  handleTopicSelected(topic: string) {
    const targetSection = document.getElementById(topic);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }




  

}
