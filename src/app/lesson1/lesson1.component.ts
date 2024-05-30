import { Component, HostListener, Input } from '@angular/core';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { LessonTextComponent } from '../lesson-text/lesson-text.component';
import { QuizQuestion } from '../quiz.model';
import { TopicListService } from '../topic-list.service';
import { NgIf } from '@angular/common';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lesson1',
  standalone: true,
  imports: [LessonQuizComponent, LessonTextComponent, ScrollToTopComponent, RouterLink],
  templateUrl: './lesson1.component.html',
  styleUrl: './lesson1.component.css'
})
export class Lesson1Component {

  //lessonId!: string; // Assuming this is set appropriately
  @Input() lessonId: string | undefined;
  currentLessonId: string | undefined;

  constructor(private router: Router, private topicService: TopicListService) {
    const lessonTitle = 'Campus Journalism';
    const topics = ['What is Campus Journalism?', 'The importance of Campus Journalism', 'Quiz']; 
    this.topicService.updateTopicNames(lessonTitle, topics);
  }



  ngOnInit(): void {
    this.currentLessonId = this.lessonId;
    console.log('in lesson1 ngOnInit, the currentLessonId is: ', this.currentLessonId);
    
    
  }



  navigateToQuiz() {
    const quizData = this.getQuizData(); // Replace with actual method to get quiz data
   // this.quizService.setQuizData(quizData);
    this.router.navigate(['/lessons', this.lessonId, 'quiz']);
    console.log('this Lesson ID: ', this.lessonId);
  }

  getQuizData() {
    // Logic to retrieve quiz data
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
