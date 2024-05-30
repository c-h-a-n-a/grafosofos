import { Component, HostListener, Input } from '@angular/core';
import { LessonQuizComponent } from '../lesson-quiz/lesson-quiz.component';
import { LessonTextComponent } from '../lesson-text/lesson-text.component';
import { QuizQuestion } from '../quiz.model';
import { TopicListService } from '../topic-list.service';
import { NgIf } from '@angular/common';
import { ScrollToTopComponent } from '../scroll-to-top/scroll-to-top.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { state } from '@angular/animations';
import { QuizDataServiceService } from '../quiz-data-service.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private topicService: TopicListService, private quizDataService: QuizDataServiceService) {
    const lessonTitle = 'Campus Journalism';
    const topics = ['What is Campus Journalism?', 'The importance of Campus Journalism', 'Quiz']; 
    this.topicService.updateTopicNames(lessonTitle, topics);
  }



  ngOnInit(): void {
    this.currentLessonId = this.lessonId;
    console.log('in lesson1 ngOnInit, the currentLessonId is: ', this.currentLessonId);
    // Ensure lessonId is retrieved correctly
    this.lessonId = this.route.snapshot.paramMap.get('lessonId') as string;
    
    
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

  goToQuiz() {
    this.quizDataService.setQuestions(this.quizQuestions);
    this.router.navigate(['/lessons', this.lessonId, 'quiz'], { state: { questions: this.quizQuestions } });
    console.log('goToQuiz is clicked, the questions are : ', this.quizQuestions);
  }

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
