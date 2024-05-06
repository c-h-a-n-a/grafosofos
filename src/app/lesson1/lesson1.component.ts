import { Component, HostListener, Input } from '@angular/core';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { LessonTextComponent } from '../lesson-text/lesson-text.component';
import { QuizQuestion } from '../quiz.model';
import { TopicListService } from '../topic-list.service';
import { NgIf } from '@angular/common';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-lesson1',
  standalone: true,
  imports: [LessonQuizComponent, LessonTextComponent, ScrollToTopComponent],
  templateUrl: './lesson1.component.html',
  styleUrl: './lesson1.component.css'
})
export class Lesson1Component {

  constructor(private topicService: TopicListService) {
    const lessonTitle = 'Lesson Title for Lesson 1';
    const topics = ['Topic 4', 'Topic 5', 'Topic 6']; 
    this.topicService.updateTopicNames(lessonTitle, topics);
  }

  quizQuestions: QuizQuestion[] = [
    { 
      text: 'What is 1 + 1?',
      options: ['1', '2', '3', '4'],
      correctAnswer: 1
    },
    { 
      text: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Madrid', 'Paris'],
      correctAnswer: 3
    },
    // Add more questions as needed
  ];

  showScrollButton: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Toggle visibility of scroll button based on scroll position
    this.showScrollButton = window.scrollY > 100; // Adjust the value as needed
  }

  scrollToTop() {
    // Scroll to the top of the lesson component
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
