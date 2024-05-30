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
      text: '1. It is the practice of journalism found in educational settings.',
      options: ['Campus Journalism', 'Magazines', 'Reporting', 'Blogs'],
      correctAnswer: 0
    },
    { 
      text: '2. What century did the radio, television, and the internet emerged?',
      options: ['19th century', '20th century', '18th century', '16th century'],
      correctAnswer: 1
    },
    { 
      text: '3. What year did the history of college journalism in the Philippines began with the publication of El Liliputiense by the UST?',
      options: ['1980', '1819', '1890', '1987'],
      correctAnswer: 2
    },
    { 
      text: '4. It is the frequently produced by student-run publications, magazines, blogs, and radio.',
      options: ['News', 'Blogs', 'Radio', 'Reports'],
      correctAnswer: 3
    },
    { 
      text: '5. What year is the history of journalism in the Philippine Islands?',
      options: ['1890', '1964', '1896', '1933'],
      correctAnswer: 3
    },
    { 
      text: '6. What year is John Lent in the Philippine Mass Communication?',
      options: ['1962', '1890', '1964', '1933'],
      correctAnswer: 2
    },
    { 
      text: '7. Campus Journalism provides student a voice to discuss important issues and events.',
      options: ['False', 'True'],
      correctAnswer: 1
    },
    { 
      text: '8. Campus Journalism helps student become more aware and engaged citizens by teaching them about current issues.',
      options: ['False', 'True'],
      correctAnswer: 0
    },
    { 
      text: '9. Schools should support campus journalism program to develop students and uphold principles of free expression and civic participation.',
      options: ['False', 'True'],
      correctAnswer: 1
    },
    { 
      text: '10. Student journalism cannot be included into a variety of courses and taught alongside disciplines like physics and history. ',
      options: ['False', 'True'],
      correctAnswer: 1
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
