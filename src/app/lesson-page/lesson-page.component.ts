import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  selectedLesson!: string;
  isSidebarOpen: boolean = false;
  isLargeScreen: boolean = false;

  constructor(private route: ActivatedRoute, private titleService: Title, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLargeScreen = window.innerWidth >= 640;
      this.handleResize();
    }

    this.route.params.subscribe((params: Params) => {
      const lessonId = params['lessonId'];
      const pageTitle = `Lesson | ${lessonId}`;
      this.titleService.setTitle(pageTitle);
      this.selectedLesson = lessonId;
    });
  }

  handleContentSelection(content: string) {
    console.log('Selected Content:', content);
    this.selectedContent = content;
  }

  handleTopicSelected(topic: string) {
    const targetSection = document.getElementById(topic);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @HostListener('window:resize', ['$event'])
  handleResize(event?: Event) {
    if (isPlatformBrowser(this.platformId)) {
      this.isLargeScreen = window.innerWidth >= 640;
      if (this.isLargeScreen) {
        this.isSidebarOpen = true;
      } else {
        this.isSidebarOpen = false;
      }
    }
  }
}
