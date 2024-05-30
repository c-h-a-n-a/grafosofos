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
import { Lesson5ComponentComponent } from '../lesson5-component/lesson5-component.component';

@Component({
  selector: 'app-lesson-page',
  standalone: true,
  imports: [LeftNavBarHoverComponent, CommonModule, LessonsComponent, Lesson1Component, 
    Lesson2Component, Lesson3Component, Lesson4Component, Lesson5ComponentComponent
  ],
  templateUrl: './lesson-page.component.html',
  styleUrl: './lesson-page.component.css'
})
export class LessonPageComponent implements OnInit{
  
  selectedContent: string = 'Default';
  selectedLesson: string | undefined;
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
      this.selectedLesson = lessonId; console.log('this.selectedLesson : ', this.selectedLesson);
      this.scrollToTop(); // Scroll to top when navigating to a new lesson
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

      if (!this.isLargeScreen) {
        // Adjust scroll position for small screens
        setTimeout(() => {
          const yOffset = -70; // Adjust the offset as needed
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 300); // Delay to ensure smooth scroll has completed
      }
    }

    if (!this.isLargeScreen) {
      this.isSidebarOpen = false; // Close the sidebar on mobile after selection
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleSidebarClose(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
